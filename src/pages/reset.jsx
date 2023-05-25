import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import swal from "sweetalert2";
import { useRouter } from "next/router";


import { AuthLayout } from "./loginRegisterComponent/AuthLayout";
import { Button } from "./loginRegisterComponent/Button";
import { TextField } from "./loginRegisterComponent/Fields";

export default function PasswordReset() {
  const [formValue, setformValue] = React.useState({
    password: "",
    password2: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  let router = useRouter();

  const baseURL = "http://34.125.67.36:8000/api/v1.0/reset";

  const handleSubmit = (event) => {
    event.preventDefault();

    let token_query = router.query["token"];
    let token_decoded = token_query
      .replaceAll("%3D", "=")
      .replaceAll("%2F", "/");
    let url_array = token_decoded.split("/");
    let uid = url_array[0];
    let token = url_array[1];

    console.log(uid + ": " + token)

    const resetFormData = new FormData();
    resetFormData.append("uid", uid)
    resetFormData.append("token", token)
    resetFormData.append("new_pwd", formValue.password)
    resetFormData.append("password2", formValue.password2)

    console.log(formValue)

    axios
      .post(baseURL, {
        uid: uid,
        token: token,
        new_pwd: formValue.password,
        password2: formValue.password2
      })
      .then((response) => {
        console.log(response.data);

        new swal({
          title: "Restablecimiento correcto",
          icon: "success",
          text: JSON.stringify(response.data)
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("{", "")
            .replaceAll("}", "")
            .replaceAll(",", "\n")
            .replaceAll('"', ""),
        });
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
            .replaceAll(
              "non_field_errors:Unable to log in with provided credentials.",
              "El usuario que ingresaste no existe o la contraseña es incorrecta, prueba de nuevo."
            ),
        });
      });
  };

  return (
    <div className="h-full bg-white">
      <Head>
        <title>Recovery - Alknos</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home"></Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Recupera tu cuenta
            </h2>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 mt-10 gap-y-8"
        >
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
  );
}
