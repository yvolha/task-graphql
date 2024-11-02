import { UUID } from "crypto";
import { IMeberTypeId } from "./member-type.js";

export type IMemberType = {
  id: IMeberTypeId;
  discount: number;
  postsLimitPerMonth: number;
}

export type IPost = {
  id: UUID;
  title: string;
  content: string;
  authorId: UUID;
}

export type IProfile = {
  id: UUID;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export type IUser = {
  id: UUID;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: UUID;
    authorId: UUID;
  }[];
  subscribedToUser?: {
    subscriberId: UUID;
    authorId: UUID;
  }[];
};