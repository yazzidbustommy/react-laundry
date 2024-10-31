import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const loginSchema = z.object({
    username: z.string().min(1, "Username can't be empty"),
    password: z.string().min(1, "Password can't be empty"),
  });

  const formLogin = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("auth/login", data);
      const token = response.data.token || response.data.data.token;
      if (token) {
        localStorage.setItem("token", token);
        Swal.fire({
          title: "Sign In Success",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate("/admin");
      } else {
        Swal.fire({
          title: "Sign In Failed, Please Try Again",
          icon: "error",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Sign In Failed, Please Try Again",
        icon: "error",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-200">
      <Card className="w-80 md:w-96 p-6">
        <CardHeader className="flex flex-col justify-center gap-5">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <h1 className="font-bold text-3xl">React Laundry</h1>
          <img
            className="w-20"
            src="../../public/laundry.svg"
            alt=""
            srcset=""
          />
        </CardHeader>
        <CardBody>
          <Divider />
          <form
            onSubmit={formLogin.handleSubmit(loginSubmit)}
            className="gap-4 flex flex-col justify-center items-center"
          >
            <Controller
              name="username"
              control={formLogin.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    label="Username"
                    size="lg"
                    variant="underlined"
                    className="font-bold"
                    placeholder="Enter your username"
                    onBlur={field.onBlur}
                  />
                );
              }}
            />

            <Controller
              name="password"
              control={formLogin.control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    type="password"
                    {...field}
                    isInvalid={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    label="Password"
                    variant="underlined"
                    size="lg"
                    className="font-bold"
                    placeholder="Enter your password"
                    onBlur={field.onBlur}
                  />
                );
              }}
            />

            <Button
              type="submit"
              className="w-full"
              color="primary"
              variant="ghost"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
