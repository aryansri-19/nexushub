import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string(),
});

const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10).optional(),
  startDate: z.date().min(new Date()),
  startTime: z.string(),
  endDate: z.date().optional(),
  endTime: z.string().optional(),
  locationType: z.string(),
  location: z.string().optional(),
  onlineLink: z.string().optional(),
  banner: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isFree: z.boolean(),
  price: z.number().optional(),
  capacity: z.number().optional(),
});

export { SignInSchema, SignUpSchema, createEventSchema };
