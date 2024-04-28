import { NextResponse } from "next/dist/server/web/spec-extension/response";
import prisma from "@/lib/prisma";

export const POST = async (request: any) => {
  try {
    const data = await request.json();

    const isEmailExist = await prisma.participant.findUnique({
      where: { email: data.email },
    });

    if (isEmailExist) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const newParticipant = await prisma.participant.create({
      data: {
        name: data.name,
        email: data.email,
        level: Number(data.level),
      },
    });

    return NextResponse.json(newParticipant);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: any) => {
  try {
    const data = await request.json();

    const isParticipantExist = await prisma.participant.findUnique({
      where: { id: data.id },
    });

    if (!isParticipantExist) {
      return NextResponse.json(
        { error: "Participant not exist" },
        { status: 400 }
      );
    }

    const updatedParticipant = await prisma.participant.update({
      data: {
        name: data.name,
        level: Number(data.level),
        updatedAt: new Date(),
      },
      where: {
        id: data.id,
      },
    });

    return NextResponse.json(updatedParticipant);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const GET = async (request: any, {params}: any) => {
  try {
    const {searchParams: URLSearchParams} = new URL(request.url)
    const id = URLSearchParams.get('id')

    const participant = await prisma.participant.findUnique({
      where: {
        id: id ?? '',
      },
    });

    return NextResponse.json(participant);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: any) => {
  try {
    const data = await request.json();

    const isEmailExist = await prisma.participant.findUnique({
      where: { id: data },
    });

    if (!isEmailExist) {
      return NextResponse.json(
        { error: "Participant not exist" },
        { status: 400 }
      );
    }

    const participant = await prisma.participant.delete({
      where: {
        id: data,
      },
    });

    return NextResponse.json(participant);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
