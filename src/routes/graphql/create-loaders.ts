import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export function createLoaders(prisma: PrismaClient) {
    return {
        postsLoader: new DataLoader(async (authorIds: readonly string[]) => {
            const posts = await prisma.post.findMany({
              where: { authorId: { in: authorIds as string[] } },
            });
        
            return authorIds.map((id) => posts.filter((post) => post.authorId === id));
        }),
      
        memberTypeLoader: new DataLoader(async (memberTypeIds: readonly string[]) => {
            const memberTypes = await prisma.memberType.findMany({
                where: { id: { in: memberTypeIds as string[]} },
            });
        
            return memberTypeIds.map((id) => memberTypes.find((type) => type.id === id));
        }),
    
        profilesLoader: new DataLoader(async (userIds: readonly string[]) => {
            const profiles = await prisma.profile.findMany({
                where: { userId: { in: userIds as string[] } },
            });
        
            return userIds.map((id) => profiles.find((profile) => profile.userId === id));
        }),
        
        userSubscribedToLoader: new DataLoader(async (subscriberIds: readonly string[]) => {
            const authors = await prisma.subscribersOnAuthors.findMany({
                where: { subscriberId: { in: subscriberIds as string[] } },
                include: { author: true },
            });
    
            return subscriberIds.map((id) =>
                authors
                .filter((author) => author.subscriberId === id)
                .map((author) => author.author),
            );
        }),
      
        subscribedToUserLoader: new DataLoader(async (authorIds: readonly string[]) => {
            const subscribers = await prisma.subscribersOnAuthors.findMany({
                where: { authorId: { in: authorIds as string[]} },
                include: { subscriber: true },
            });
        
            return authorIds.map((id) =>
                subscribers
                .filter((subscriber) => subscriber.authorId === id)
                .map((subscriber) => subscriber.subscriber),
            );
        }),
    }
}