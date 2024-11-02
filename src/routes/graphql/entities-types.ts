import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./types/uuid.js";
import { IProfile, IUser } from "./types/query-fields.js";
import { Context } from "./types/context.js";
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