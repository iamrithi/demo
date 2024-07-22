import {
  createDocuments,
  documentsFindByFilterOption,
  getAllDocuments,
} from "@/api-middleware/documents";
import { CanteenSchema } from "@/schemas/index";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    Bucket: process.env.BUCKET_NAME,
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
  const name = data.get("name");
  const description = data.get("description");
  const type = data.get("type");
  const file = data.get("file") as File | null;
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
  const checkName = await documentsFindByFilterOption({ name: name });
  if (checkName.length > 0) {
    return Response.json(
      {
        success: false,
        data: null,
        message: `File name ${name} already exists`,
      },
      { status: 400 }
    );
  }
  try {
    const upLoadReturen = await uploadFileToS3(file, file.name);
    console.log(upLoadReturen);
    if (upLoadReturen) {
      const payLoad = {
        key: upLoadReturen,
        name: name,
        description: description,
        url: `${process.env.CLOUDFRONT_URL}/${upLoadReturen}`,
        type: type,
      };
      const documets = await createDocuments(payLoad);
      return Response.json(
        {
          success: true,
          data: documets,
          message: "Document created successfully",
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
    const documets = await getAllDocuments();
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
