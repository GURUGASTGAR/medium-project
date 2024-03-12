import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode ,verify,sign, jwt } from 'hono/jwt'
import { use } from 'hono/jsx'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }
}>()
// app.use('/api/v1/*',async (c,next)=>{
//   const prisma = new PrismaClient({
//     datasourceUrl:c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   await next();
// })

app.use('/api/v1/blog/*',async (c,next)=>{
  
  
  await next();
})


app.post('/api/v1/user/signup', async (c) => {
  const  body = await c.req.json();
  try {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    //no need as in databasethe user is unique
    // if(body.email){
    //   c.status(403)
    //   return c.json({
    //     msg:"user already exists"
    //   })
    // }
    
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
app.post('/api/v1/user/signin',async (c) => {
  const body = await c.req.json();
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
   const user = await prisma.users.findUnique({
    where:{
      email:body.email
    }})
    if(!user){
      c.status(403);
		return c.json({ error: "user not found" });
    }
   if(user.password!=body.password){
    c.status(403)  
    return c.json({error:"invalid email/password"})
   }
   const token = await sign({id:user.id},c.env.JWT_SECRET)
   return c.json({token})
  } catch (error) {
    console.log(error)
    c.status(411)
    return c.text('invalid')
  }
  })
app.post('/api/v1/blog',(c) => {
    return c.text("hello")
    })
app.put('/api/v1/blog',(c) => {
      return c.text("hello")
      })

app.get('/api/vl/blog/:id', (c) => {
   
  const id = c.req.param('id')
  console.log(id)
  return c.text('Hello Hono! id : '+ id)
})
app.get('/api/vl/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})


export default app


/*POST /api/v1/user/signup
POST /api/v1/user/signin
POST /api/v1/blog
PUT /api/v1/blog
GET /api/v1/blog/:id
GET /api/v1/blog/bulk
*/