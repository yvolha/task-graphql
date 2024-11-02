import { UUID } from "crypto";

export type ICreatePostInput = {
  title: string;
  content: string;
  authorId: UUID;
}
  
export type ICreateProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  userId: UUID;
  memberTypeId: "BASIC" | "BUSINESS";
}
  
export type ICreateUserInput = {
  name: string;
  balance: number;
}