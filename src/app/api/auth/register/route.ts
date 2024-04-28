import { NextResponse } from "next/dist/server/web/spec-extension/response";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: any) => {
  try {
    const data = await request.json();

    const isEmailExist = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (isEmailExist) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
