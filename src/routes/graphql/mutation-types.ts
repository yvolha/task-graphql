import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { postType, profileType, userType } from "./entities-types.js";
import { Context } from "./types/context.js";
import { IChangePostInput, IChangeProfileInput, IChangeUserInput, ICreatePostInput, ICreateProfileInput, ICreateUserInput } from "./types/mutation-fields.js";
import { UUIDType } from "./types/uuid.js";
import { MemberTypeId } from "./types/member-type.js";
import { UUID } from "crypto";

interface DtoType<T> {
  dto: T;
  id?: UUID;
};

interface SubscriptionInfo {
  userId: UUID,
  authorId: UUID,
}

//users
const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

const changeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

// profiles
const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt)},
    userId: { type: new GraphQLNonNull(UUIDType)},
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId)},
  },
});

const changeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean},
    yearOfBirth: { type: GraphQLInt},
    memberTypeId: { type: MemberTypeId},
  },
});


// posts
const createPostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType)},
  },
});

const changePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: { type: GraphQLString },
    content: { type: GraphQLString },
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

    changeUser: {
      type: new GraphQLNonNull(userType),
      args: { 
        id: { type: UUIDType },
        dto: { type: changeUserInput },
      },
      resolve: (_obj, { id, dto } : DtoType<IChangeUserInput>, { prisma }: Context) => {
          return prisma.user.update({
            where: { id: id },
            data: dto,
          });
      },
    },

    deleteUser: {
      type: GraphQLString,
      args: { 
        id: { type: UUIDType },
      },
      resolve: async (_obj, { id } : DtoType<IChangeUserInput>, { prisma }: Context) => {
         await prisma.user.delete({
          where: { id },
        });
      },
    },

    subscribeTo: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_obj, { userId, authorId }: SubscriptionInfo, { prisma }) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId: authorId,
          },
        });
      }
    },

    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_obj, { userId, authorId }: SubscriptionInfo, { prisma }) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });
      }
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

    changeProfile: {
      type: new GraphQLNonNull(profileType),
      args: { 
        id: { type: UUIDType },
        dto: { type: changeProfileInput },
      },
      resolve: (_obj, { id, dto } : DtoType<IChangeProfileInput>, { prisma }: Context) => {
          return prisma.profile.update({
            where: { id: id },
            data: dto,
          });
      },
    },

    deleteProfile: {
      type: GraphQLString,
      args: { 
        id: { type: UUIDType },
      },
      resolve: async (_obj, { id } : DtoType<IChangeProfileInput>, { prisma }: Context) => {
          await prisma.profile.delete({
            where: { id },
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

    changePost: {
      type: new GraphQLNonNull(postType),
      args: { 
        id: { type: UUIDType },
        dto: { type: changePostInput },
      },
      resolve: async (_obj, { id, dto } : DtoType<IChangePostInput>, { prisma }: Context) => {
          return await prisma.post.update({
            where: { id: id },
            data: dto,
          });
      },
    },

    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
      resolve: async (_obj, { id } : DtoType<IChangePostInput>, { prisma }: Context) => {
        await prisma.post.delete({
          where: { id },
        });
      },
    },
  }),
})