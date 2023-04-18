import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import swal from "sweetalert2";

import { useRouter } from "next/router";

import { AuthLayout } from "./loginRegisterComponent/AuthLayout";
import { Button } from "./loginRegisterComponent/Button";
import { Logo } from "./loginRegisterComponent/Logo";

export default function Verify() {

    let router = useRouter();

    const handleSubmit = (event) => {
      
        event.preventDefault();
        
        let token_query = router.query["token"];
        let token_decoded = token_query.replaceAll("%3D", "=").replaceAll("%2F", "/")
        let url_array = token_decoded.split("/");

        const baseURL = "http://127.0.0.1:8000/api/v1.0/verify";

        let uid = url_array[0];
        let token = url_array[1];

        console.log(uid);
        console.log(token);

        const formData = new FormData();
        formData.append('uid', uid);
        formData.append("token", token);

        for (const value of formData.values()) {
          console.log(value);
        }
        
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios
            .post(baseURL, formData, config)
            .then((response) => {
              
                console.log(response.data);
                window.location.href = 'http://localhost:3000/login';
                new swal({
                    title: "Verificacion correcta",
                    icon: "success",
                    text: JSON.stringify(response.data)
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll("{", "")
                        .replaceAll("}", "")
                        .replaceAll(",", "\n")
                        .replaceAll('"', ""),
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
                        .replaceAll(
                            "non_field_errors:Unable to log in with provided credentials.",
                            "No se pudieron ingresar con las credenciales provistas."
                        ),
                });
            });
    };

    return (
        <div className='bg-white h-full'>
        <Head>
          <title>Verify - Alknos</title>
        </Head>
        <AuthLayout>
          <div className="flex flex-col">
            <Link href="/" aria-label="Home">
              
            </Link>
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Verifica tu cuenta
              </h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
            <div>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
              >
                <span>
                  Verificar <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>
        </AuthLayout>
      </div>
    );
}