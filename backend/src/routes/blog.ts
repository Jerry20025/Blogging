import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { cors } from 'hono/cors';
import { updateBlogInput,createBlogInput } from '@jerry2002/medium-common';
export const blogRouter=new Hono<{
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
	},
    Variables:{
        userId:string
    }
}>()

blogRouter.use("/*",cors());
blogRouter.use('/*',async (c,next)=>{
    try{
        const authHeader=c.req.header("authorization")||"";
        const user=await verify(authHeader,c.env.JWT_SECRET);
        if(user){
            //@ts-ignore
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                msg:"you are not logged in",
            })
        }
    }catch(error){
        console.log(error);
        c.status(403);
        return c.json({
            msg:"some error while authenticatin"
        })
    }
})
blogRouter.post('/post',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            const userId=c.get("userId");
            const body=await c.req.json()
            const {success}=createBlogInput.safeParse(body);
            if(!success){
            c.status(400);
            return c.json({msg:"Input Provided is Incorrect"})
            }
            const blog=await prisma.blog.create({
                data:{
                    title:body.title,
                    content:body.content,
                    authorId:userId,
                    published:true
                }
            })
            return c.json({
                blog,
               authId:userId,
            })
        }catch(error){
            console.log(error);
            c.status(403);
            return c.json({
                msg:"internal error"
            })
        }
})
blogRouter.put('/blog-update',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            const body=await c.req.json()
            const blog=await prisma.blog.update({
                where:{
                    id:body.id
                },
                data:{
                    title:body.title,
                    content:body.content,
                    published:true
                }
            })
            return c.json({
                blog:blog,
               id:blog.id,
            })
        }catch(error){
            console.log(error);
            c.status(411);
            return c.json({
                msg:"internal error"
            })
        }
})
//pagination: means not all posts, only top 10 blogs, and ask for scroll
blogRouter.delete('/blog-delete',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            const body=await c.req.json()
            const blog=await prisma.blog.findUnique({
                where:{
                    id:body.id,
                },
            })
            if(blog?.published===true){
                await prisma.blog.delete({
                    where:{
                        id:body.id,
                    }
                })
            }
            return c.json({
               msg:"Blog deleted Successfully",
            })
        }catch(error){
            console.log(error);
            c.status(411);
            return c.json({
                msg:"internal error"
            })
        }
})

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            const blog=await prisma.blog.findMany({
                select:{
                    content:true,
                    title:true,
                    id:true,
                    author:{
                        select:{
                            name:true,
                        }
                    }
                }
            });
            return c.json({
               blog
            })
        }catch(error){
            console.log(error);
            c.status(411);
            return c.json({
                msg:"error while fetching blog"
            })
        }
})
blogRouter.get('/allpost/:authorId',async (c)=>{
    const authorId=c.req.param("authorId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            
            const blog=await prisma.blog.findMany({
                where:{
                    authorId:authorId,
                },
                select:{
                    title:true,
                    content:true,
                    id:true,
                    author:{
                        select:{
                            name:true,
                            
                        }
                    }
                }
            })
            return c.json({
               blog,
            })
        }catch(error){
            console.log(error);
            c.status(411);
            return c.json({
                msg:"error while fetching blog"
            })
        }
})

blogRouter.get('/:id',async (c)=>{
    const id=c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        try{
            
            const blog=await prisma.blog.findFirst({
                where:{
                    //@ts-ignore
                    id:id,
                },
                select:{
                    title:true,
                    content:true,
                    author:{
                        select:{
                            name:true,
                            
                        }
                    }
                }
            })
            return c.json({
               blog
            })
        }catch(error){
            console.log(error);
            c.status(411);
            return c.json({
                msg:"error while fetching blog"
            })
        }
})


// "888249c8-2d0c-446b-aad8-aec321c6ed34":""