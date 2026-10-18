import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      usePolling: true,
      interval: 300
    }
  },
  publicDir: 'public',
  plugins: [
    {
      name: 'serve-root-images',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/images/')) {
            const cleanUrl = req.url.split('?')[0];
            const rootImgPath = path.join(process.cwd(), cleanUrl.slice(1));
            const publicImgPath = path.join(process.cwd(), 'public', cleanUrl.slice(1));
            
            const targetPath = fs.existsSync(rootImgPath) ? rootImgPath : (fs.existsSync(publicImgPath) ? publicImgPath : null);
            if (targetPath && fs.statSync(targetPath).isFile()) {
              const ext = path.extname(targetPath).toLowerCase();
              const mimeMap = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.gif': 'image/gif'
              };
              res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
              fs.createReadStream(targetPath).pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    target: 'esnext'
  }
});
