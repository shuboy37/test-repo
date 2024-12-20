import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full m-2 p-2">
      <div
        className={`mx-auto w-full max-w-lg bg-[#2a3347] rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center text-white">
          <span className="inline-block w-full max-w-[100px] ml-12">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-white">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            &nbsp; Sign Up
          </Link>
        </p>

        {/* we are going to display error here */}
        {error && <p className="text-red-600 mt-8 text-center"> {error} </p>}

        <form onSubmit={handleSubmit(login)} className="mt-4 text-left">
          <div className="space-y-3 text-white">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              maxLength={8}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />

            <Button
              type="submit"
              className="w-full text-black bg-green-500 mt-4 font-semibold hover:text-black"
            >
              {" "}
              Sign in{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
