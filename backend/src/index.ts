import { Hono } from 'hono'
import { userRouter } from './routes/auth.controller'
import { blogRouter } from './routes/blog.controller'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }                                                
}>()

  

app.use("/api/*",cors());
app.route('api/v1/user',userRouter);
app.route('api/v1/blog',blogRouter); 
console.log("outside blog req")


export default app


