"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { verifyUser } from "@/actions/authController/authFunctions";
import { BackButton } from "@/components/BackButton";

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const Signin = () => {
  // const router = useRouter();
  const auth = useAuth();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    progressive: true,
  });
  function onSubmit() {
    const { email, password } = form.getValues();
    const res = verifyUser({ email, password });
    console.log(res);
  }
  const handleLoginProvider = async (provider: "google" | "github") => {
    const login = await signIn(provider,
      { callbackUrl: `https://localhost:3000/api/auth/callback/${provider}`, redirect: false}
    )
    console.log(login)
  }
  return (
    <>
      <Card className={`${poppins.className} p-10 w-3/4 `}>
        <CardContent className="flex justify-center">
          <Card className="w-1/2 text-center">
            <CardHeader>
              <CardTitle>Sign in with providers</CardTitle>
              <CardDescription>Sign in using Google or Github</CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 p-10 flex flex-col justify-center items-center group">
              <Button
                variant="ghost"
                className="border w-3/4 space-x-5 font-bold"
                onClick={() => handleLoginProvider("google")}
              >
                <Image
                  src="/images/google.png"
                  alt="Google logo"
                  width={25}
                  height={25}
                />
                <p>Continue with Google</p>
              </Button>
              <Button
                variant="ghost"
                className="border w-3/4 space-x-5 font-bold"
                onClick={() => handleLoginProvider("github")}
              >
                <Image
                  src="/images/github.png"
                  alt="Github logo"
                  width={25}
                  height={25}
                />
                <p>Continue with Github</p>
              </Button>
            </CardContent>
            <CardFooter className="p-10 flex justify-center">
              <p>
                Dont have an account?{" "}
                <Link href="/auth/sign-up">
                  <span className="text-blue-500 hover:underline">
                    Create one
                  </span>
                </Link>
              </p>
            </CardFooter>
            <BackButton href="/" label="← Home"/>
          </Card>
          <Separator orientation="vertical" style={{ width: "5px" }} />
          <Card className="w-1/2">
            <CardHeader className="text-center">
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Sign in using email</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Secret Code"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Separator style={{ height: "5vh", visibility: "hidden" }} />
                  <Button className=" w-full bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 hover:opacity-75">
                    Submit
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default Signin;
