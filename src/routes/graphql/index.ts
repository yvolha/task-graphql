import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, myGraphQlSchema } from './schemas.js';
import { graphql } from 'graphql';
import { Context } from './types/context.js';

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

      console.log(req.body.query, req.body.variables)

      const {data, errors} = await graphql({
        schema: myGraphQlSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: context,
      });

      return { data, errors };
    },
  });
};


export default plugin;
