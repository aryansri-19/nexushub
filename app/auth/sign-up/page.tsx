"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { signIn } from "next-auth/react";
import { addUser } from "@/actions/authController/authFunctions";
import { BackButton } from "@/components/BackButton";

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string(),
});
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const Signup = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    progressive: true,
  });
  const [alert, setAlert] = useState({ message: "", isAlert: false });
  const auth = useAuth();
  useEffect(() => {
    console.log("Checking user");
    if (auth.user) {
      router.push("/");
    }
  }, [auth.user, router]);
  function onSubmit() {
    const { email, password, confirmPassword, name } = form.getValues();
    if (!name) {
      setAlert({ message: "Please fill your username", isAlert: true });
      return;
    } else if (confirmPassword !== password) {
      setAlert({ message: "Password doesn't match", isAlert: true });
      return;
    } else setAlert({ message: "", isAlert: false });
    const userToStore = addUser({ name, email, password });
    localStorage.setItem("user", JSON.stringify(userToStore));
    console.log("Hello", userToStore);
    router.push("/");
  }
  const handleLoginProvider = async (provider: "google" | "github") => {
    const login = await signIn(provider,
      { callbackUrl: `https://nexushub.app.vercel/api/auth/callback/${provider}`, redirect: false}
    )
    console.log(login)
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
              <CardTitle>Sign up with providers</CardTitle>
              <CardDescription>Sign up using Google or Github</CardDescription>
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
                Already have an account?{" "}
                <Link href="/auth/sign-in">
                  <span className="text-blue-500 hover:underline">Sign in</span>
                </Link>
              </p>
            </CardFooter>
            <BackButton href="/" label="← Home"/>
          </Card>
          <Separator orientation="vertical" style={{ width: "5px" }} />
          <Card className="w-1/2">
            <CardHeader className="text-center">
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Sign up using email</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your username"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
                            placeholder="Must be more than 8 characters"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm your password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Password Again"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button className="w-full bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 hover:opacity-75">
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

export default Signup;
