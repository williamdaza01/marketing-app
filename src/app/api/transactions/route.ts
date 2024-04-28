import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    try {
      const data = await request.json();
  
      const newTransaction = await prisma.transaction.create({
        data: {
         amount: Number(data.amount),
         participantId: data.participantId,
        },
      });
  
      return NextResponse.json(newTransaction);
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  };