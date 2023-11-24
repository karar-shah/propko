import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Field Required." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string({ required_error: "Field Required." }),
});

export type AuthSchema = z.infer<typeof authSchema>;

// export const signupSchema = z
//   .object({
//     email: z
//       .string({ required_error: "Field Required." })
//       .email({ message: "Please enter a valid email address." }),
//     password: z
//       .string({ required_error: "Field Required." })
//       .min(8, { message: "Password must have atleast 8 characters." }),
//     confPassword: z
//       .string({ required_error: "Field Required." })
//       .min(8, { message: "Password must have atleast 8 characters." }),
//     name: z.string({ required_error: "Field Required." }),
//   })
//   .refine(({ confPassword, password }) => password === confPassword, {
//     message: "Confirm password does not match.",
//     path: ["confPassword"],
//   });

// export type SignupSchema = z.infer<typeof signupSchema>;
