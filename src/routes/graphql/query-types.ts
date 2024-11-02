import {
  GraphQLBoolean,
  GraphQLFloat, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { UUIDType } from "./types/uuid.js";
import { Context } from "./types/context.js";
import { IMemberType, IPost, IProfile, IUser } from "./types/query-fields.js";
import { MemberTypeId } from "./types/member-type.js";


// users
export const userType = new GraphQLObjectType({
  name: "User",
	fields: () => ({
			id: {type: UUIDType},
			name: {type: GraphQLString},
			balance: {type: GraphQLFloat},
      profile: {
        type: profileType,
        resolve: ({ id }: IUser, _args, { prisma }: Context) => {
          return prisma.profile.findUnique({
            where: {
              userId: id,
            },
          });
        },
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: ({ id }: IUser, _args, { prisma }: Context) => {
          return prisma.post.findMany({
            where: {
              authorId: id,
            },
          });
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(userType),
        resolve: ({ id }: IUser, _args, { prisma }: Context) => {
          return prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: id,
                },
              },
            },
          });
        },
      },
      subscribedToUser: {
        type: new GraphQLList(userType),
        resolve: ({ id }: IUser, _args, { prisma }: Context) => {
          return prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: id,
                },
              },
            },
          });
        },
      },
	}),
})


// memberTypes
export const memberTypeType = new GraphQLObjectType({
  name: "MemberType",
	fields: () => ({
    id: {type: MemberTypeId },
    discount: {type: GraphQLFloat},
    postsLimitPerMonth: {type: GraphQLInt},
	}),
})


// posts
export const postType = new GraphQLObjectType({
  name: "Post",
	fields: () => ({
    id:  {type: UUIDType},
    title: {type: GraphQLString},
    content: {type: GraphQLString},
	}),
})

// profiles
export const profileType = new GraphQLObjectType({
  name: "Profile",
	fields: () => ({
    id: {type: UUIDType},
    isMale: {type: GraphQLBoolean},
    yearOfBirth: {type: GraphQLInt},
    memberType: {
      type: memberTypeType,
      resolve: ({ memberTypeId }: IProfile, _args, { prisma }: Context) => {
        return prisma.memberType.findUnique({
          where: {
            id: memberTypeId,
          },
        });
      },
    }
	}),
})


// root query
export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    // users
    users: {
      type: new GraphQLList(userType),
      resolve: async (_obj, _args, { prisma }: Context) => { 
        return await prisma.user.findMany();
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
