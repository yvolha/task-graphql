import {
  GraphQLFloat, 
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PrismaClient } from "@prisma/client";

import { UUIDType } from "./types/uuid.js";


type Context = {
	prisma: PrismaClient,
}

export const userType = new GraphQLObjectType({
  name: "User",
	fields: {
			id: {type: UUIDType},
			name: {type: GraphQLString},
			balance: {type: GraphQLFloat},
	},
})

export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    users: {
      type: userType,
      resolve: async (_obj, _args, { prisma }: Context) => {
        return prisma.user.findMany();
      },
    },
  },
})