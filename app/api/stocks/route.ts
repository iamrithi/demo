import { createStock, getAllStock } from "@/api-middleware/stockAction";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import AWS from "aws-sdk";

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_KEY || "",
  },
});
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || "",
    secretAccessKey: process.env.SECRET_KEY || "",
  },
});
const uploadFileToS3 = async (file: File, name: string) => {
  const bufferFile = await file.arrayBuffer();
  const buffer = Buffer.from(bufferFile);
  const fileName = `${Date.now()}-${name}`.trim(); // Optional: generate a unique file name
  const upload = new PutObjectCommand({
    Bucket: "csd-data-extract",
    Key: fileName, // Use the original file name or set your own
    Body: buffer,
    ContentType: "application/pdf", // Use the file's MIME type
  });
  await s3.send(upload);
  return fileName;
};
//CREATE canteen
export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File | null;
  const canteen_id = data.get("canteen_id");
  if (!file) {
    return Response.json(
      {
        success: false,
        data: null,
        message: "No file provided",
      },
      { status: 400 }
    );
  }
  try {
    const upLoadReturen = await uploadFileToS3(file, file.name);
    if (upLoadReturen) {
      const payLoad = {
        canteen_id: canteen_id,
        key: upLoadReturen,
        file_name: `${upLoadReturen}`,
        file_url: `${process.env.CLOUDFRONT_URL}/${upLoadReturen}`,
      };
      const stock = await createStock(payLoad);
      if (stock) {
        const payLoad = {
          bucket_name: "csd-data-extract",
          file_name: upLoadReturen,
          csd_id: stock.canteen_id,
          stock_id: stock.id,
        };

        const params = {
          MessageBody: JSON.stringify(payLoad),
          QueueUrl:
            "https://sqs.ap-south-1.amazonaws.com/772634581176/csd_upload",
        };

        try {
          const data = await sqsClient.send(new SendMessageCommand(params));
          console.log("Success, message sent. MessageID:", data.MessageId);
        } catch (err) {
          console.log("Error", err);
        }
      }
      return Response.json(
        {
          success: true,
          data: stock,
          message: "CSD-Stock created successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        data: null,
        message: error,
      },
      { status: 400 }
    );
  }
}
//GET ALL canteen
export async function GET(req: Request) {
  try {
    const documets = await getAllStock();
    return Response.json({ success: true, data: documets });
  } catch (error: any) {
    if (error.code === "P1001") {
      return Response.json(
        {
          success: false,
          data: null,
          message: `Network error`,
        },
        { status: 502 }
      );
    }
    console.log(error);
    return Response.json(
      { success: false, data: null, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
