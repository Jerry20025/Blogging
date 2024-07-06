import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt';
import {userRouter} from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
app.use('/*',cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);
//https://backend.ak2498315.workers.dev/api/v1/ we can directly use this in postman

export default app
