import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signupInput,signinInput } from "@jerry2002/medium-common"
import { cors } from 'hono/cors';

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();

userRouter.use('/*',cors())
//@ts-ignore


userRouter.post('/signup', async (c)=>{
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(400);
      return c.json({msg:"Input Provided is Incorrect"})
    }
    const checkEmail=await prisma.user.findUnique({
      where:{
        email:body.email,
      }
    })
    if(checkEmail){
      c.status(409);
      return c.json({
        msg:"User Already exists",
      })
    }

    if(body.password.length<6){
      c.status(206);
      return c.json({msg:"password required at least 6 length"})
    }
    const user=await prisma.user.create({
      data:{
        email:body.email,
        password:body.password,
        name:body.name,
      },
    })

    const token = await sign({ id: user.id },c.env.JWT_SECRET);
    return c.text(token);
  }catch(error){
    c.status(403);
    console.log(error);
    return c.json({msg:"Server Error"})
  }
})
userRouter.post('/signin', async (c)=>{
const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
      const body=await c.req.json();
      const {success}=signinInput.safeParse(body);
      if(!success){
        c.status(400);
        return c.json({msg:"Input Provided is Incorrect"})
      }
      const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
      })
      if(!user){
        c.status(404);
        return c.json({
          error:"User not Found"
        })
      }
      //@ts-ignore
      const jwt=await sign({id:user.id},c.env.JWT_SECRET);
      
      return c.text(jwt);
  }catch(error){
    console.log(error);
    c.status(403);
    return c.json({
      msg:"error while login"
    })
  }
})
userRouter.post('/getId', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body=await c.req.json();
        const user=await prisma.user.findUnique({
        where:{
          email:body.email,
        }
        })
        if(!user){
          c.status(404);
          return c.json({
            error:"User not Found"
          })
        }
        //@ts-ignore
        const jwt=await sign({id:user.id},c.env.JWT_SECRET);
        
        return c.json({
          id:user.id
        });
    }catch(error){
      console.log(error);
      c.status(403);
      return c.json({
        msg:"error while login"
      })
    }
  })
  