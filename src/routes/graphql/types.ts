import {
  GraphQLBoolean,
  GraphQLFloat, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { UUIDType } from "./types/uuid.js";
import { Context } from "./types/context.js";



// users
export const userType = new GraphQLObjectType({
  name: "User",
	fields: () => ({
			id: {type: UUIDType},
			name: {type: GraphQLString},
			balance: {type: GraphQLFloat},
	}),
})



// memberTypes
export const memberTypeType = new GraphQLObjectType({
  name: "MemberType",
	fields: () => ({
    id: {type: GraphQLString},
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
	}),
})



// root query
export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.user.findMany();
      },
    },
    memberTypes: {
      type: new GraphQLList(memberTypeType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.memberType.findMany();
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.post.findMany();
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (_obj, _args, { prisma }: Context) => {
        return await prisma.profile.findMany();
      },
    },
  }),
})

export const myGraphQlSchema = new GraphQLSchema({
  query: queryType,
})
