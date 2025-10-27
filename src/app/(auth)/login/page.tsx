"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { BiLeftArrow } from "react-icons/bi";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submiting, setsubmiting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setsubmiting(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const error = await response.json();
        setError(error.message);
      }
      setsubmiting(false);
    } catch (err) {
      setsubmiting(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-card w-full max-w-md rounded-lg p-6 shadow-lg">
          <Link href="/"><BiLeftArrow className='text-foreground text-xl' /></Link>
        <h1 className="mb-6 text-center text-2xl font-bold">Welcome Back</h1>

        {error && (
          <div className="bg-destructive/20 text-destructive mb-4 rounded-md p-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="bg-background w-full rounded-md border p-2"
            />
            {errors.email && (
              <span className="text-primary text-sm">
                *{errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="bg-background w-full rounded-md border p-2"
            />
            {errors.password && (
              <span className="text-primary text-sm">
                *{errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn-brutual w-full transition-all"
            disabled={submiting}
          >
            {submiting ? (
              <CgSpinner className="mx-auto animate-spin  text-xl" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
