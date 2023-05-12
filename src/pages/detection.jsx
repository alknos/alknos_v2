import React, { useState, useEffect } from "react";
import Visualization from './detectionComponent/visualization'
import axios from "axios";
import swal from "sweetalert2";
import MainLayout from "Layout/MainLayout";
import Navhome from "./navhome";
import Head from "next/head";


export default function Detection() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [iupac_name, setIupacName] = useState("Nombre IUPAC");
    const [common_name, setCommonName] = useState("-");
    const [general_info, setGeneralInfo] = useState("Información General Del Compuesto");

    useEffect(() => {
        requestGet()
    }, [])

    //Functions
    const getBase64 = (file) => {
        return new Promise((resolve) => {

            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                //console.log(baseURL);
                resolve(baseURL);
            };
        });
    };

    const requestGet = async () => {
        // Store the states in the form data
        const formData = new FormData();
        formData.append("base64", "")
        //Starts inference model
        axios
            .get("http://127.0.0.1:8000/api/v1.0/chem-detection", formData)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                if (error.response.data != null) {
                    console.log(JSON.stringify(error.response.data)
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll("{", "")
                        .replaceAll("}", "")
                        .replaceAll(",", "\n")
                        .replaceAll('"', ""));
                    new swal({
                        title: "Error",
                        icon: "error",
                        text: "Ocurrió algo, vuelve a intentarlo"
                    });
                }
                else {
                    new swal({
                        title: "Error",
                        icon: "error",
                        text: "Hubo un error inesperado",
                    });
                }
            });
    }

    //Handlers

    const handleFile = (e) => {
        let file = e.target.files[0];
        setSelectedFile(file);
    };

    const imageDetection = async () => {
        // store the states in the form data
        getBase64(selectedFile).then((result) => {
            selectedFile["base64"] = result;

            const formData = new FormData();
            formData.append(
                "base64",
                result.replaceAll("data:image/png;base64,", "")
            );
            axios
                .post("http://127.0.0.1:8000/api/v1.0/chem-detection", formData)
                .then((response) => {
                    console.log(response.data);
                    setIupacName(response.data.iupac_name);
                    setCommonName(Object.values(response.data.possible_common_name));
                    console.log(common_name);
                })
                .catch((error) => {
                    if (error.response.data != null) {
                        console.log(JSON.stringify(error.response.data)
                            .replaceAll("[", "")
                            .replaceAll("]", "")
                            .replaceAll("{", "")
                            .replaceAll("}", "")
                            .replaceAll(",", "\n")
                            .replaceAll('"', ""),)
                        new swal({
                            title: "Error",
                            icon: "error",
                            text: "Ocurrió algo, vuelve a intentarlo"
                        });
                    } else {
                        new swal({
                            title: "Error",
                            icon: "error",
                            text: "Hubo un error inesperado",
                        });
                    }
                });
        });
    };


    return (
        <Navhome>
            <Head>
                <title>Compound Detection | Alknos</title>
            </Head>
            <div className="p-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Detección de compuestos</h1>
                    </div>
                </header>

                <div className="mx-auto max-w-4xl p-10">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 p-3">Ingresa la imagen a detectar</h3>
                    <input
                        required
                        onChange={(e) => handleFile(e)}
                        type="file"

                        className=" relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-10 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >

                    </input>

                    <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-6">
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg sm:p-6">

                        </div>
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg sm:p-6">

                        </div>
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg sm:p-6">

                        </div>
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg sm:p-6">

                        </div>
                        <div className="px-4 py-5 overflow-hidden bg-white rounded-lg sm:p-6">

                        </div>
                        <div className="justify-end px-5 py-8 overflow-hidden bg-white rounded-lg sm:p-6">
                            <button
                                onClick={(e) => imageDetection(e)}
                                className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Iniciar
                                <span className="text-gray-400" aria-hidden="true">
                                    &rarr;
                                </span>
                            </button>
                        </div>
                    </dl>

                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Detección de compuesto</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Información acerca del compuesto detectado.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nombre sistemático</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{iupac_name}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Nombres comunes</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {Object.values(common_name).map((item, key) =>
                                            <p key={key}>{item}</p>
                                        )}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Visualización</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><Visualization /></dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Información general</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {general_info}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </Navhome>
    )
}