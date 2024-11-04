import { UUID } from "crypto";
import { IMeberTypeId } from "./member-type.js";

export type IChangePostInput = {
  title: string;
  content: string;
}

export type IChangeProfileInput = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: IMeberTypeId;
}

export type IChangeUserInput = {
  name: string;
  balance: number;
}

export type ICreatePostInput = IChangePostInput & {
  authorId: UUID;
}
  
export type ICreateProfileInput = IChangeProfileInput & {
  userId: UUID;
}
  
export type ICreateUserInput = IChangeUserInput;
