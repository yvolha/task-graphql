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
        resolve: ({ id }: IUser, _args, { profilesLoader }: Context) => {
          return profilesLoader.load(id);
        },
      },
      posts: {
        type: new GraphQLList(postType),
        resolve: ({ id }: IUser, _args, { postsLoader }: Context) => {
          return postsLoader.load(id);
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(userType),
        resolve: ({ id }: IUser, _args, { userSubscribedToLoader }: Context) => {
          return userSubscribedToLoader.load(id)
        },
      },
      subscribedToUser: {
        type: new GraphQLList(userType),
        resolve: ({ id }: IUser, _args, { subscribedToUserLoader }: Context) => {
          return subscribedToUserLoader.load(id);
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
          resolve: ({ memberTypeId }: IProfile, _args, { memberTypeLoader }: Context) => {
            return memberTypeLoader.load(memberTypeId);
          },
        }
      }),
  })