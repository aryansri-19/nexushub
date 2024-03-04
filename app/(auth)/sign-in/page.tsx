"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { verifyUser } from "@/actions/authController/authFunctions";
import { BackButton } from "@/components/authErrorPage/BackButton";
import handleAuth from "@/lib/handleAuth";

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const Signin = () => {
  const router = useRouter();
  const auth = useAuth();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    progressive: true,
  });
  
  const res = handleAuth();
  useEffect(() => {
    if (res.success) {
      router.push("/");
    }
  }, [res])

  const [alert, setAlert] = useState({ message: "", isAlert: false });
  async function onSubmit() {
    const { email, password } = form.getValues();
    const user = await verifyUser({ email, password })
    if (user.error) {
      setAlert({ message: user.error, isAlert: true });
    } else {
      localStorage.setItem("user", JSON.stringify(user))
      auth.setUser(()=>[user.user?.id, user.user?.name, user.user?.email])
      router.push("/");
      console.log(user)
    }
  }
  const handleLoginProvider = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: "/"
      });
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  }
  return (
    <>
    {alert.isAlert && (
        <Alert
          variant="destructive"
          className="fixed bottom-0 bg-white right-0 w-1/5 transition duration-500 ease-in-out transform -translate-x-10 "
        >
          <AlertTitle>Invalid input</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}
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
                <Link href="/sign-up">
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
                            type="password"
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
