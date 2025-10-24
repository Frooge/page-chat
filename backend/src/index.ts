import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import chat from './routes/chat.js'

const app = new Hono()

app.use('/*', cors())

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.route('/chat', chat)

const port = Number(process.env.PORT) || 3000
const hostname = process.env.HOSTNAME || '0.0.0.0'

serve({
  fetch: app.fetch,
  port,
  hostname
}, (info) => {
  const protocol = process.env.USE_HTTPS === 'true' ? 'https' : 'http'
  const publicUrl = process.env.PUBLIC_URL
  const serverUrl = publicUrl || `${protocol}://${info.address}:${info.port}`
  
  console.log(`Server is running on ${serverUrl}`)
})
