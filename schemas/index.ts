import * as z from "zod";

export const phoneLoginSchema = z.object({
  phone_no: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),
});
export const otpVerificationSchema = z.object({
  otpId: z.string().min(6, "").optional(),
  otp: z.string().min(6, "Enter a valid OTP").optional(),
});
export const credentialLoginSchema = z.object({
  email: z
    .string()
    .min(1, "user name is required")
    .refine((val) => val.trim().length > 0, {
      message: "Please enter an username",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((val) => val.trim().length > 0, {
      message: "Please enter a password",
    }),
});
export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().optional(),
  phone_no: z
    .string()
    .min(10, { message: "Mobile number is required" })
    .max(10, { message: "Mobile number is required" }),
  image: z.string().optional(),
  canteen_id: z.string().optional().nullable(),
  pincode: z.string().optional(),
  mobile_device_token: z.string().optional(),
  service: z.string().optional(),
  role: z.string().array().optional(),
  rank: z.string().optional(),
  isApproved: z.boolean().optional().default(false),
  is_phone_no_verified: z.boolean().optional().default(false),
  isFirstLogin: z.boolean().optional().default(false),
});
export const CanteenSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  unique_id: z.string().optional(),
  pincode: z.string().optional(),
  address: z.string().optional(),
  phone_no: z.string().optional(),
  manager_id: z.string().min(1, { message: "Manager is required" }),
});
export const FaqSchema = z.object({
  type_id: z.string().min(1, { message: "type is required" }),
  question: z.string().min(1, { message: "question is required" }),
  answer: z.string().min(1, { message: "answer is required" }),
});

export const FaqTypeSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
});
export const GrievanceTypeSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
});
// export const GrievanceStatusSchema = z.object({
//   name: z.string().min(1, { message: "name is required" }),
// });
export const GrievanceSchema = z.object({
  type: z.string().min(1, { message: "type is required" }),
  question: z.string().optional(),
  answer: z.string().optional().nullable(),
  user_id: z.string().optional().nullable(),
  canteen_id: z.string().optional(),
});

const DOC_MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const DOC_ACCEPTED_FILE_TYPES = ["application/pdf"];
export const DocumentSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  type: z.string().min(1, { message: "type is required" }),
  description: z
    .string()
    .min(1, { message: "description is required" })
    .default("--"),
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      return !file || file.size <= DOC_MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return file && DOC_ACCEPTED_FILE_TYPES.includes(file!.type);
    }, "Invalid file type. Only PDF files are allowed."),
});
const STOCK_MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const STOCK_ACCEPTED_FILE_TYPES = [
  "application/octet-stream",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]; //first metiod to restrict the file type
const ACCEPTED_FILE_EXTENSIONS = [".txt"]; // second method to restrict files

export const StockSchema = z.object({
  canteen_id: z.string().optional(),
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      return !file || file.size <= STOCK_MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine(
      (file) => {
        const fileExtension = file && file.name.split(".").pop()?.toLowerCase();
        return ACCEPTED_FILE_EXTENSIONS.includes(`.${fileExtension}`);
      },
      {
        message:
          "Invalid file type. Only text, PRN, and Excel files are allowed.",
      }
    ),
  // .refine((file) => {
  //   return file && STOCK_ACCEPTED_FILE_TYPES.includes(file!.type);
  // }, "Invalid file type. Only text, PRN, and Excel files are allowed."),
});
