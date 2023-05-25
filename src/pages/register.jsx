import Head from 'next/head'
import Link from 'next/link'
import * as React from "react";

import axios from 'axios';
import swal from "sweetalert2";

import { TextField } from './loginRegisterComponent/Fields'
import { AuthLayout } from './loginRegisterComponent/AuthLayout'
import { Button } from './loginRegisterComponent/Button'
import { Logo } from './loginRegisterComponent/Logo'

export default function Register() {
  const [formValue, setformValue] = React.useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const baseURL = "http://34.125.67.36:8000/api/v1.0/register";

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("first_name", formValue.first_name);
    loginFormData.append("last_name", formValue.last_name);
    loginFormData.append("email", formValue.email);
    loginFormData.append("password", formValue.password);
    loginFormData.append("password2", formValue.password2);

    axios
      .post(baseURL, loginFormData)
      .then((response) => {
        console.log(response.data);

        new swal({
          title: "Usuario registrado",
          icon: "success",
        }).then(() => {
          //window.location.reload(false);
          window.location.href = 'http://macsafe.gerdoc.com/login';
        });
      })
      .catch((error) => {
        console.log(error.response.data);

        new swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(error.response.data)
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("{", "")
            .replaceAll("}", "")
            .replaceAll(",", "\n")
            .replaceAll('"', "")                
            .replaceAll('username:A user with that username already exists.',"Ya existe un usuario con ese nombre.")
            .replaceAll('password:This password is too short.','La contraseña es muy corta, debe contener por lo menos 8 caracteres')
            .replaceAll('It must contain at least 8 characters.',' '),
        });
      });
  };
  
  return (
    <>
      <Head>
        <title>Sign Up - Alknos</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              ¡Empieza gratis!
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Accede
              </Link>{' '}
              a tu cuenta.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 mt-10 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          <TextField
            className="col-span-full"
            label="Nombre de usuario"
            id="username"
            name="username"
            type="text"
            autoComplete="given-name"
            placeholder="Nombre de usuario"
            value={formValue.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Nombre"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={formValue.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Apellido"
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            value={formValue.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Correo Electrónico"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
           <TextField
            className="col-span-full"
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Confirma tu contraseña"
            id="password2"
            name="password2"
            type="password"
            value={formValue.password2}
            onChange={handleChange}
            required
          />
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Registrarse <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}
