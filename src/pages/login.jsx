import Head from 'next/head'
import Link from 'next/link'
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import swal from "sweetalert2";

import { AuthLayout } from './loginRegisterComponent/AuthLayout'
import { Button } from './loginRegisterComponent/Button'
import { TextField } from './loginRegisterComponent/Fields'

export default function Login() {

  const [formValue, setformValue] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const baseURL = "http://34.125.31.170:8000/api/v1.0/login";
  const URL = "http://34.125.31.170:8000/api/v1.0/get-details";

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginFormData = new FormData();
    loginFormData.append("username", formValue.username);
    loginFormData.append("password", formValue.password);

    axios
      .post(baseURL, loginFormData)
      .then((response) => {
        const cookies = new Cookies();
        cookies.set("token", response.data.token, { path: "/" })
        cookies.set("username", formValue.username, { path: "/" });

        const config = {
          headers: {
            Authorization: `Token ${response.data.token}`,
          },
        };

        axios.all([
          axios.get(URL, config)
        ]).then(axios.spread((userDetailsResponse) => {
          var a = userDetailsResponse.data.first_name + " " + userDetailsResponse.data.last_name
          console.log(userDetailsResponse.data.first_name + " " + userDetailsResponse.data.last_name)
          cookies.set("complete_name", userDetailsResponse.data.first_name + " " + userDetailsResponse.data.last_name, { path: "/" });
        })).catch((error) => {
          console.error(error);
        });

        window.location.href = 'http://macsafe.gerdoc.com:3000/homepage';
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
            .replaceAll('non_field_errors:Unable to log in with provided credentials.', 'El usuario que ingresaste no existe o la contraseña es incorrecta, prueba de nuevo.'),
        });
      });
  };

  return (
    <div className='bg-white h-full'>
      <Head>
        <title>Login - Alknos</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">

          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Accede a tu cuenta
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
          <TextField
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <div className="text-sm">
            <Link
              href="/passwordResetMail"
              className="font-medium text-blue-600 hover:text-blue-400 duration-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Inicia Sesión <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </div>
  )
}

