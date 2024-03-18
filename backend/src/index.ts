import { Hono } from 'hono'
import { userRouter } from '../routes/auth.controller'
import { blogRouter } from '../routes/blog.controller'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }                                                
}>()
app.use('*',async (c,next)=>{
  try {
    // const prisma = new PrismaClient({
    //   datasourceUrl: c.env.DATABASE_URL
    // }).$extends(withAccelerate());
    // c.set("prisma",prisma)
    await next();
  } catch (error) {
    
  }
  
})
app.route('api/v1/blog',blogRouter); 
app.route('api/v1/user',userRouter);
console.log("outside blog req")


export default app


