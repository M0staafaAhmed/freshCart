import * as z from 'zod'



export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    rePassword: z.string().nonempty('Please confirm your password'),
    phone: z.string().nonempty('Phone number is required').regex(/^(?:\+2)?01[0125][0-9]{8}$/, 'Only Egyptian phone numbers are allowed'),
  }).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })