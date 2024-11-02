export type IMemberType = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export type IPost = {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export type IProfile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export type IUser = {
  id: string;
  name: string;
  balance: number;
  userSubscribedTo?: {
    subscriberId: string;
    authorId: string;
  }[];
  subscribedToUser?: {
    subscriberId: string;
    authorId: string;
  }[];
};