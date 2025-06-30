

export default {
  build: {
    entry: './.azion-nitro/worker.js',
    bundler: 'esbuild',
    preset: 'javascript',
    polyfills: true,
  },
  origin: [
    {
      name: 'origin-storage-default',
      type: 'object_storage',
    },
  ],
  functions: [
    {
      name: 'nitro-handler',
      path: '.edge/worker.js',
    },
  ],
  rules: {
    request: [
      {
        name: 'Deliver Static Assets',
        match: '\\.(css|js|ttf|woff|woff2|pdf|svg|jpg|jpeg|gif|bmp|png|ico|mp4|json|xml|html)$',
        behavior: {
          setOrigin: {
            name: 'origin-storage-default',
            type: 'object_storage',
          },
          deliver: true,
        },
      },
      {
        name: 'Execute Nitro Handler',
        match: '^/',
        behavior: {
          runFunction: 'nitro-handler',
          forwardCookies: true,
        },
      },
    ],
  },
};
