// netlify/functions/server.js
const { createServerHandler } = require('@netlify/next');

const handler = createServerHandler({
  // Specify the path to your Next.js app
  dir: '.next/standalone',
  // Ensure API routes are properly handled
  config: {
    useServerlessTraceTarget: true,
    generateStaticRoutes: true,
    generateEtags: true
  }
});

exports.handler = async (event, context) => {
  const response = await handler(event, context);
  return response;
};
