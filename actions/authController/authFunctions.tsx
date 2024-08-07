"use server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

type Form = {
  name?: string;
  email: string;
  password?: string;
  image?: string;
};

export async function addUser(formData: Form) {
  const name = formData.name;
  const email = formData.email;
  const password = formData.password || "default";
  const image = formData.image;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    if (user) {
      console.log("User already exists", user);
      return { error: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword,
        image: image as string,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { user: newUser, token: token };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function verifyUser(formData: Form) {
  const email = formData.email;
  const password = formData.password || "default";
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });
    if (!user) {
      console.log("User doesn't exist", user);
      return { error: "User doesn't exist" };
    }
    const passwordMatch = await bcrypt.compare(
      password as string,
      user.password
    );
    if (!passwordMatch) {
      console.log("Password doesn't match");
      return { error: "Password doesn't match" };
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return { user: user, token: token };
  } catch (error) {
    console.error("Error verifying user:", error);
    return { error: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
}
