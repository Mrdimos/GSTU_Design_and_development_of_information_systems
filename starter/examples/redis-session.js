// Пример интеграции Redis с express-session. Установите зависимости из package.json.
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

export async function createSessionMiddleware() {
  if (!process.env.REDIS_URL || !process.env.SESSION_SECRET) {
    throw new Error('REDIS_URL and SESSION_SECRET are required');
  }
  const client = createClient({ url: process.env.REDIS_URL });
  client.on('error', (error) => console.error('Redis client error', error));
  await client.connect();
  return session({
    store: new RedisStore({ client }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 30 * 60 * 1000 },
  });
}
