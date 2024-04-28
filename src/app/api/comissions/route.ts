import { NextResponse } from "next/dist/server/web/spec-extension/response";
import prisma from "@/lib/prisma";
import { Transaction } from "@prisma/client";

export const GET = async () => {
  try {
    const transactions = await prisma.transaction.findMany();
    const commissions = await calculateCommissions(transactions);
    return NextResponse.json(commissions);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};

const calculateCommissions = async (transactions: Transaction[]): Promise<{
  id: string;
  name: string;
  level: number;
  idTransaction: string;
  commission: number;
}[]> => {
  const commissions: {
    id: string;
    name: string;
    level: number;
    idTransaction: string;
    commission: number;
  }[] = await Promise.all(
    transactions.map(async (transaction) => {
      const { participantId, amount } = transaction;
      const participant = await prisma.participant.findUnique({
        where: { id: participantId },
      });
      const commissionRate = getCommissionRate(participant?.level ?? 0);
      const commission = amount * commissionRate;
      return {
        id: participantId,
        name: participant?.name ?? "",
        level: participant?.level ?? 3,
        idTransaction: transaction.id,
        commission: Number(commission.toFixed(2)),
      };
    })
  );

  return commissions;
};

const getCommissionRate = (level: number): number => {
  const commissionRates: { [key: number]: number } = {
    1: 0.1, // Nivel 1 recibe el 10%
    2: 0.05, // Nivel 2 recibe el 5%
    3: 0.025, // Nivel 3 recibe el 2.5%
  };

  return commissionRates[level] || 0;
};
