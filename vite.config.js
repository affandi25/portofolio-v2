import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    if (!(key in process.env)) process.env[key] = value
  }

  return {
    plugins: [
      react(),
      {
        // Menjalankan api/chat.js saat npm run dev, tanpa perlu Vercel CLI.
        name: 'local-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            try {
              const { default: handler } = await server.ssrLoadModule('/api/chat.js')
              const chunks = []
              for await (const chunk of req) chunks.push(chunk)

              const response = await handler(
                new Request('http://localhost/api/chat', {
                  method: req.method,
                  headers: { 'content-type': req.headers['content-type'] || 'application/json' },
                  body: req.method === 'GET' ? undefined : Buffer.concat(chunks),
                })
              )

              res.statusCode = response.status
              response.headers.forEach((value, key) => res.setHeader(key, value))
              res.end(Buffer.from(await response.arrayBuffer()))
            } catch (error) {
              console.error('[api/chat]', error)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Terjadi kesalahan di server lokal.' }))
            }
          })
        },
      },
    ],
  }
})
