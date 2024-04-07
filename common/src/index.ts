import z from 'zod'


export const signupSchema = z.object({
    email:z.string().email(),
    name: z.string().optional(),
    password: z.string().min(8)
})

export const loginSchema = z.object({
    email:z.string().email(),
    password: z.string().min(8)
})

export const blogSchema = z.object({
    title: z.string().max(100),
    content: z.string()
})

export const updateBlog = z.object({
    title: z.string().max(100),
    content: z.string(),
    id: z.string()
})
export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type BlogInput = z.infer<typeof blogSchema>
export type UpdateblogInput = z.infer<typeof updateBlog>