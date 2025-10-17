import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import chat from './routes/chat.js'

const app = new Hono()

// Enable CORS for browser extension
app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Mount chat routes
app.route('/chat', chat)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
