"use client";
import Board from "@/components/Board";
import LevelView from "@/components/Level";
import React, { useEffect, useState } from "react";

interface Comissions {
  id: string;
  name: string;
  level: number;
  idTransaction: string;
  commission: number;
}

const DashboardPage = () => {
  const [commissionData, setCommissionData] = useState<Comissions[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/comissions");
        const data = await response.json();
        setCommissionData(data);
      } catch (error) {
        console.error("Error fetching commission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !commissionData) {
    return <h1 className="h-[calc(100vh-7rem)] flex justify-center items-center text-slate-200 font-bold text-4xl mb-4">Loading...</h1>;
  }
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
      <h1 className="text-slate-200 font-bold text-4xl mb-4 mt-2">Dashboard</h1>
      <Board data={commissionData} />
      <div className="flex gap-4">
        <LevelView
          data={commissionData.filter(
            (participant) => participant.level === 1
          )}
          level={1}
        />
        <LevelView
          data={commissionData.filter(
            (participant) => participant.level === 2
          )}
          level={2}
        />
        <LevelView
          data={commissionData.filter(
            (participant) => participant.level === 3
          )}
          level={3}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
