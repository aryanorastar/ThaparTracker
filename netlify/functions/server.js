// netlify/functions/server.js
const { createServerHandler } = require('@netlify/next');

const handler = createServerHandler({
  // Specify the path to your Next.js app
  dir: '.next/standalone',
});

exports.handler = async (event, context) => {
  const response = await handler(event, context);
  return response;
};
