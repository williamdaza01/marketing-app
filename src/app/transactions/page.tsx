"use client"
import { Participant } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Agrega la función de reset del hook useForm
  } = useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
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
        setLoading(false); // Marcar la carga como completada una vez que se obtienen los datos, ya sea exitosamente o con error
      }
    };

    fetchParticipants();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setFormSubmitted(true); // Indicar que se ha enviado el formulario correctamente
    } else {
      const error = await res.json();
      alert(error.error);
    }
  });

  // Resetear el formulario si se ha enviado correctamente
  if (formSubmitted) {
    reset(); // Limpia los campos del formulario
    setFormSubmitted(false); // Restablece el estado
  }

  if (loading) {
    return <h1 className="h-[calc(100vh-7rem)] flex justify-center items-center text-slate-200 font-bold text-4xl mb-4">Loading...</h1>; // Renderizar una pantalla de carga mientras se cargan los datos
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Create Transaction
        </h1>

        <label htmlFor="amount" className="text-slate-500 mb-2 block text-sm">
          Amount:
        </label>
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            required: {
              value: true,
              message: "Amount is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">
            {errors.name.message as string}
          </span>
        )}

        <label htmlFor="participantId" className="text-slate-500 mb-2 block text-sm">
          Participants:
        </label>
        <select
          {...register("participantId", {
            required: {
              value: true,
              message: "Participant is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        >
          <option value="">Select an option</option>
            {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                {participant.name}
                </option>
            ))}
        </select>
        {errors.level && (
          <span className="text-red-500 text-xs">
            {errors.level.message as string}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded mt-2">
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
