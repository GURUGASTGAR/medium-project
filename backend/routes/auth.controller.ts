import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>();

//console.log("inside auth")
userRouter.post('/signup', async (c) => {
    //console.log("inside post")
    const  body = await c.req.json();
    try {
      const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate());
     
      const user = await prisma.users.create({
        data : {
          email:body.email,
          name:body.name,
          password:body.password,
        }
      })
    
      const secret = c.env.JWT_SECRET;
      const token = await sign({id:user.id},secret)
      return c.json({token}); 
    } catch (error) {
      console.log(error)
      c.status(411)
      return c.text("invalid")
    }
  })
  userRouter.post('/signin',async (c) => {
    const body = await c.req.json();
    try {
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
      }).$extends(withAccelerate());
     const user = await prisma.users.findUnique({
      where:{
        email:body.email,
        password:body.password
      }})
      if(!user){
        c.status(403);
          return c.json({ error: "incorrect creds" });
      }
     const token = await sign({id:user.id},c.env.JWT_SECRET);
     
     return c.json({token})
    } catch (error) {
      console.log(error)
      c.status(411)
      return c.text('invalid')
    }
    })