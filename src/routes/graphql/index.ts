import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit'

import { createGqlResponseSchema, gqlResponseSchema, myGraphQlSchema } from './schemas.js';
import { Context } from './types/context.js';

const MAX_DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  const context: Context = {
    prisma: prisma,
  }

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {

      const { query, variables } = req.body;

      const parsedQuery = parse(query);
      const validationErrors = validate(myGraphQlSchema, parsedQuery, [depthLimit(MAX_DEPTH_LIMIT)]);

      if (validationErrors.length > 0) {
        return { errors: validationErrors};
      }

      const {data, errors} = await graphql({
        schema: myGraphQlSchema,
        source: query,
        variableValues: variables,
        contextValue: context,
      });

      return { data, errors };
    },
  });
};


export default plugin;
