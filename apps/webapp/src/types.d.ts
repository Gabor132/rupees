import { Product, User as PrismaUser } from "database";

export type Rupee = 5 | 10 | 20 | 50 | 100;

export type ImageUploadResult = {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimeType: string;
  originalName: string;
  path: string;
  size: number;
};

export type BuyResult = {
  totalSpent: number;
  product: Product;
  change: number[];
};

export type User = Omit<PrismaUser, "password">;
