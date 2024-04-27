"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const error = await res.json();
      alert(error.error);
    }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

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

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message as string}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className="w-full p-3 rounded block mb-2 bg-slate-900 text-slate-300"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs">
            {errors.confirmPassword.message as string}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
