import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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
      // return graphql();
    },
  });
};

/*

export default plugin;
fastify.route({
  url: '/',
  method: 'GET',
  schema: {
    response: {
      200: Type.Array(profileSchema),
    },
  },
  async handler() {
    return prisma.profile.findMany();
  },
});

fastify.route({
  url: '/:profileId',
  method: 'GET',
  schema: {
    ...getProfileByIdSchema,
    response: {
      200: profileSchema,
      404: Type.Null(),
    },
  },
  async handler(req) {
    const profile = await prisma.profile.findUnique({
      where: {
        id: req.params.profileId,
      },
    });
    if (profile === null) {
      throw httpErrors.notFound();
    }
    return profile;
  },
});
*/