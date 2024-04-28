import { NextResponse } from "next/dist/server/web/spec-extension/response";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {

    const participants = await prisma.participant.findMany();

    return NextResponse.json(participants);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
