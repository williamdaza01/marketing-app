"use client";
import { Participant } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditPage = ({params: {id}}: {params: {id:string}}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pt, setParticipant] = useState<Participant>({} as Participant);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`/api/participants/participant?id=${id}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setParticipant(data);
        } else {
          console.error("Failed to fetch participants");
        }
      } catch (error) {
        console.error("Error fetching participants: ", error);
      }
    };

    fetchParticipants();
  }, [id]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/participants/participant", {
      method: "PATCH",
      body: JSON.stringify({id, ...data}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return <span></span>;
    } else {
      const error = await res.json();
      alert(error.error);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Update Participants
        </h1>

        <label htmlFor="name" className="text-slate-500 mb-2 block text-sm">
          Name:
        </label>
        <input
          type="text"
          placeholder="Name"
          defaultValue={pt.name}
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.name && (
          <span className="text-red-500 text-xs">
            {errors.name.message as string}
          </span>
        )}

        <label htmlFor="level" className="text-slate-500 mb-2 block text-sm">
          Level:
        </label>
        <select
          {...register("level", {
            required: {
              value: true,
              message: "Level is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
          defaultValue={pt.level}
        >
          <option value="">Select an option</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        {errors.level && (
          <span className="text-red-500 text-xs">
            {errors.level.message as string}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded mt-2">
          Update Participant
        </button>
      </form>
    </div>
  );
};

export default EditPage;
