import { PostStatus } from "@prisma/client";

export interface Post {
  id?: string;
  slug?: string;
  title?: string;
  cover?: string;
  content?: string;
  status?: PostStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ImagePost = {
  publicId?: string;
  signature?: string;
  secureUrl?: string;
  assetId?: string;
};