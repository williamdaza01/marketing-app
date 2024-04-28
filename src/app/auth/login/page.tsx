"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) setError(res.error);
      else {
        setError(null);
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong");
    }
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        {error && (
          <p className="bg-red-500 text-xs text-white rounded-lg">{error}</p>
        )}
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

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
        <button className="w-full bg-blue-500 text-white p-3 rounded mt-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
