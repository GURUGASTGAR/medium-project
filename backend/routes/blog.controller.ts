import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";


console.log("inside blog")

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
      },
      Variables:{
        userId:string
      }
}>();


blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header('authorization') || "";
   try {
    const user = await verify(authHeader,c.env.JWT_SECRET);
    //console.log("this is users id......................",user.id)
    if(user){
        c.set('userId', user.id)
    await next();
    }else{
        c.status(411);
        return c.text("u are not logged in")
    }
   } catch (error) {
     console.log(error);
     return c.text("invalid token");
   }
    
})

blogRouter.post('/',async (c) => { 
    console.log("inside blog post req")
    const userId = c.get('userId');
  const body = await c.req.json();
 try {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());
    //console.log("in try")
     const blog =  await prisma.post.create({
           data:{
              title:body.title,
              content: body.content,
              authorId: userId
           }
      })
   // console.log("after create")
      return c.json({id:blog.id})
 } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("sever error")
 }

})
blogRouter.put('/',async (c) => {
   const body = await c.req.json();
   try {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
     const blog =  await prisma.post.update({
        where:{
          id: body.id
        },
         data:{
              title:body.title,
              content: body.content
           }
      })
    
      return c.json({id:blog.id,
      msg:"updated the post"})
 } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("sever error")
 }
})

blogRouter.get('/get/:id',async  (c) => {
   const id = await c.req.param('id')
  try {
    const prisma =  new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
       }).$extends(withAccelerate());
      
       const post = await prisma.post.findFirst({
        where:{
            id:id  
        }
       })
      return c.json({post});
  } catch (error) {
    console.log(error);
    return c.text("error while fetching blogs");
  }
})
blogRouter.get('/bulk', async (c) => {
  try {
    const prisma =  new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
      }).$extends(withAccelerate());
      const blogs = await prisma.post.findMany({
        select:{
          title:true,
          id:true,
          authorId:true,
        }
      });
      return c.json({blogs});
  } catch (error) {
    console.log(error)
    return c.text("database error")
  }
})