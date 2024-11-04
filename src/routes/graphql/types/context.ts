import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export type Context = {
	prisma: PrismaClient;
	postsLoader: DataLoader<string, object, object[][]>;
	memberTypeLoader: DataLoader<string, object | undefined, (object | undefined)[]>;
	profilesLoader: DataLoader<string, object | undefined, (object | undefined)[]>;
	userSubscribedToLoader: DataLoader<string, object | undefined, (object | undefined)[]>;
	subscribedToUserLoader: DataLoader<string, object | undefined, (object | undefined)[]>;
}