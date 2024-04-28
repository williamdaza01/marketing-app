"use client"
import { Participant } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("/api/participants");
        if (response.ok) {
          const data = await response.json();
          setParticipants(data);
        } else {
          console.error("Failed to fetch participants");
        }
      } catch (error) {
        console.error("Error fetching participants: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const onDelete = async (id: string) => {
    const res = await fetch("/api/participants/participant", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
    } else {
      const error = await res.json();
      alert(error.error);
    }
  };

  if (loading) {
    return <h1 className="h-[calc(100vh-7rem)] flex justify-center items-center text-slate-200 font-bold text-4xl mb-4">Loading...</h1>; // Renderizar una pantalla de carga mientras se cargan los datos
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
      <h1 className="text-slate-200 font-bold text-4xl mb-4">Participants</h1>
      <table className="table-auto rounded-lg m-4">
        <thead className="">
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant: Participant) => (
            <tr key={participant.id} className="bg-gray-700 text-white">
              <td className="text-center px-4 py-2">{participant.name}</td>
              <td className="text-center px-4 py-2">{participant.email}</td>
              <td className="text-center px-4 py-2">{participant.level}</td>
              <td className="text-center px-4 py-2">
                <Link href={`/participants/edit/${participant.id}`}>Edit</Link> - 
                <button onClick={() => onDelete(participant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        href="/participants/create"
        className="bg-gray-500 text-white p-3 rounded w-2/12 text-center mt-4"
      >
        Create
      </Link>
      <Link
        href="/transactions"
        className="bg-gray-500 text-white p-3 rounded w-2/12 text-center mt-4"
      >
        Add Transaction
      </Link>
    </div>
  );
};

export default ParticipantsPage;
