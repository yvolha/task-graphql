import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { postType, profileType, userType } from "./entities-types.js";
import { Context } from "./types/context.js";
import { ICreatePostInput, ICreateProfileInput, ICreateUserInput } from "./types/mutation-fields.js";
import { UUIDType } from "./types/uuid.js";
import { MemberTypeId } from "./types/member-type.js";

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

// profiles
const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt},
    userId: { type: UUIDType},
    memberTypeId: { type: MemberTypeId},

  },
});


// posts
const createPostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType},
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
          return prisma.user.create({
            data: dto,
          });
      },
    },

    // profiles
    createProfile: {
      type: new GraphQLNonNull(profileType),
      args: { dto: { type: createProfileInput }},
      resolve: (_obj, { dto } : DtoType<ICreateProfileInput>, { prisma }: Context) => {
          return prisma.profile.create({
            data: dto,
          });
      },
    },

    // posts
    createPost: {
      type: new GraphQLNonNull(postType),
      args: { dto: { type: createPostInput }},
      resolve: (_obj, { dto } : DtoType<ICreatePostInput>, { prisma }: Context) => {
          return prisma.post.create({
            data: dto,
          });
      },
    },
  }),
})