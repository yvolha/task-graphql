import { GraphQLEnumType } from "graphql";

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
});

export type IMeberTypeId = 'BASIC' | 'BUSINESS';