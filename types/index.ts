import { IconType } from "react-icons";

export interface TabData {
  id: number;
  label: string;
  icon: IconType;
  child?: boolean;
  childLink?: TabData[];
  accessFor?: string[];
  link: string;
}

export interface ResponseData {
  success: boolean;
  data?: any | null;
  mesesage?: string;
}

export interface UserData {
  id: string;
  image: string | null;
  name: string;
  phone_no: string;
  email: string;
  password: string;
  pincode: string;
  mobile_device_token: string | null;
  service: string;
  role: string[];
  rank: string;
  isApproved: boolean;
  is_phone_no_verified: boolean;
  isFirstLogin: boolean;
  manage_canteen: CanteenData | null;
  canteen_id: string | null;
  canteen: CanteenData | null;
}
export interface CanteenData {
  id: string;
  name: string;
  phone_no: string;
  unique_id: string;
  pincode: string;
  address?: string;
  manager_id?: string;
}

export interface GrievanceData {
  id: string;
  type: string;
  question: string;
  answer: string;
  user_id: string;
  status: string;
  canteen_id: string;
  canteen: CanteenData | undefined;
  user?: UserData | null;
}
export interface GrievanceTypeData {
  id: string;
  name: string;
  grievances?: GrievanceData[];
}
export interface GrievanceStatusData {
  id: string;
  name: string;
  grievances?: GrievanceData[];
}
export interface FaqData {
  id: string;
  type_id: string;
  question: string;
  answer: string;
  type?: FaqTypeData | null;
}
export interface FaqTypeData {
  id: string;
  name: string;
  faqs?: FaqData[];
}

export interface DocumentData {
  id: string;
  name: string;
  type: string;
  description: string;
  key: string;
  url: string;
}
export interface StockData {
  id: string;
  name: string;
  canteen: CanteenData;
  file_name: string;
  file_url: string;
  key: string;
  date: Date;
}
export interface InventoryData {
  id: number; // Int       @id @default(autoincrement())
  s_no: number; // Int
  index: string; // String
  pluno: string; // String
  item_description: string; // String
  stock: number; // Int
  w_rate: number; // Decimal
  w_amt: number; // Decimal
  r_rate: number; // Decimal
  r_amt: number; // Decimal
  vat_percent: number; // Decimal
  vat_wrate: number; // Decimal
  vat_w_amt: number; // Decimal
  vat_rate: number; // Decimal
  vat_r_amt: number; // Decimal
  profit: number; // Decimal
  mpp: number; // Decimal
  group_name: string; // String
  csd_id: string; // String
  stock_id: string;
  Canteen: CanteenData[]; // String
}

// State Type

export interface UserRoleStateData {
  role: string | null; // Object value with initial properties
  setRole: (data: any) => void;
  removeRole: (data: any) => void; // Action to update user
}
export interface LoggedInUserRoleStateData {
  user: UserData | null; // Object value with initial properties
  setUser: (data: any) => void;
  removeUser: (data: any) => void; // Action to update user
}
