import Head from 'next/head'
import Link from 'next/link'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import swal from "sweetalert2";

import { AuthLayout } from './loginRegisterComponent/AuthLayout'
import { Button } from './loginRegisterComponent/Button'
import { TextField } from './loginRegisterComponent/Fields'

export default function PasswordResetMail() {
  const [formValue, setformValue] = React.useState({
    username: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const baseURL = "http://34.125.67.36:8000/api/v1.0/reset";

  const handleSubmit = (event) => {
    event.preventDefault();

    const resetFormData = new FormData();
    resetFormData.append("username", formValue.username);

    axios
      .put(baseURL, resetFormData)
      .then((response) => {
        console.log(response.data);

        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" })
        cookies.set("username",formValue.username,{path:"/"});

        window.location.href = 'http://macsafe.gerdoc.com/login';
        //window.location.reload(false);
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
            .replaceAll('non_field_errors:Unable to log in with provided credentials.','El usuario que ingresaste no existe o la contraseña es incorrecta, prueba de nuevo.'),
        });
      });
  };


  return (
    <div className='bg-white h-full'>
      <Head>
        <title>Recovery - Alknos</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
            Recupera tu contraseña
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              ¿No tienes una cuenta?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Regístrate
              </Link>{' '}
              por un plan gratuito
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
          <TextField
            label="Nombre de usuario"
            id="username"
            name="username"
            type="text"
            autoComplete="given-name"
            value={formValue.username}
            onChange={handleChange}
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Recupera <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </div>
  )
}

