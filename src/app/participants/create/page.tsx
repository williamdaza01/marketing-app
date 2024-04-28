"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Agrega la función de reset del hook useForm
  } = useForm();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/participants/participant", {
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

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">
          Create Participants
        </h1>

        <label htmlFor="name" className="text-slate-500 mb-2 block text-sm">
          Name:
        </label>
        <input
          type="text"
          placeholder="Name"
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

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message as string}
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
          Create Participant
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
