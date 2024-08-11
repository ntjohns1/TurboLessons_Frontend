
const { generateSW } = require('workbox-build');

// Configure the service worker generation
generateSW({
  globDirectory: 'dist',  // Ensure this matches your build output directory
  globPatterns: ['**/*.{html,js,css}'],  // Adjust patterns as needed
  dontCacheBustURLsMatching: new RegExp('\\.[0-9a-f]{16}\\.js$'),
  swDest: 'dist/service-worker.js',
  runtimeCaching: [{
    urlPattern: ({ request }) => request.destination === 'document',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-cache',
      expiration: {
        maxEntries: 10,
      },
    },
  }, {
    urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-resources',
      expiration: {
        maxEntries: 20,
      },
    },
  }],
  skipWaiting: true,
  clientsClaim: true,
}).then(({ count, size, warnings }) => {
  if (warnings.length > 0) {
    console.warn('Warnings encountered while generating service worker:', warnings.join('\n'));
  }
  console.log(`Generated service worker, precaching ${count} files, totaling ${size} bytes.`);
}).catch(err => {
  console.error('Error generating service worker:', err);
});