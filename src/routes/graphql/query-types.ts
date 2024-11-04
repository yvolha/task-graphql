import {
  GraphQLList, 
  GraphQLObjectType,
} from "graphql";

import { UUIDType } from "./types/uuid.js";
import { Context } from "./types/context.js";
import { IMemberType, IPost, IProfile, IUser } from "./types/query-fields.js";
import { MemberTypeId } from "./types/member-type.js";
import { memberTypeType, postType, profileType, userType } from "./entities-types.js";
import { parseResolveInfo } from "graphql-parse-resolve-info";


// root query
export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    // users
    users: {
      type: new GraphQLList(userType),
      resolve: async (_obj, _args, { prisma }: Context, info) => { 

        const resolveInfo = parseResolveInfo(info);
        const fields = resolveInfo?.fieldsByTypeName?.User || {};
        const include: { posts?: boolean, profile?: boolean, userSubscribedTo?: boolean, subscribedToUser?: boolean} = {};
        if (fields['posts']) {
          include.posts = true;
        }
        if (fields['profile']) {
          include.profile = true;
        }
        if (fields['userSubscribedTo']) {
          include.userSubscribedTo = true;
        }
        if (fields['subscribedToUser']) {
          include.subscribedToUser = true;
        }
        return prisma.user.findMany({ include });
      },
    },

    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: userType,
      args: { id: { type: UUIDType }},
      resolve: (_obj, { id }: IUser, { prisma }: Context) => {
        return prisma.user.findUnique({
          where: {
            id,
          },
        });
      },
    },

    // memberTypes
    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.memberType.findMany();
      },
    },

    memberType: {
      type: memberTypeType,
      args: { id: { type: MemberTypeId }},
      resolve: (_obj, { id }: IMemberType, { prisma }: Context) => {
        return prisma.memberType.findUnique({
          where: {
            id,
          },
        });
      },
    },

    // posts
    posts: {
      type: new GraphQLList(postType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.post.findMany();
      },
    },

    post: {
      type: postType,
      args: { id: { type: UUIDType }},
      resolve: (_obj, { id }: IPost, { prisma }: Context) => {
        return prisma.post.findUnique({
          where: {
            id,
          },
        });
      },
    },

    // profiles
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.profile.findMany();
      },
    },

    profile: {
      type: profileType,
      args: { id: { type: UUIDType }},
      resolve: (_obj, { id }: IProfile, { prisma }: Context) => {
        return prisma.profile.findUnique({
          where: {
            id,
          },
        });
      },
    },
  }),
})
