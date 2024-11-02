import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { userType } from "./entities-types.js";
import { Context } from "./types/context.js";
import { ICreateUserInput } from "./types/mutation-fields.js";

interface DtoType<T> {
  dto: T;
};

//users
const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});



export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    // users
    createUser: {
      type: new GraphQLNonNull(userType),
      args: { dto: { type: createUserInput }},
      resolve: (_obj, { dto } : DtoType<ICreateUserInput>, { prisma }: Context) => {
        console.log('here is DTO:::', dto)
          return prisma.user.create({
            data: dto,
          });
      },
    }
  }),
})