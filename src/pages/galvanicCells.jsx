import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";

export default function GalvanicCells() {

    const [galvanicCell, setGalvanicCell] = useState(null);
    const [formData, setFormData] = useState({
        electrode1: "",
        electrode2: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const createGalvanicCell = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        axios
            .post("http://127.0.0.1:8000/api/v1.0/galvanic-cell", formData)
            .then((response) => {
                let data = response.data;

                const galvanicBase64 = data.base64
                setGalvanicCell(galvanicBase64)

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
    };

    return (
        <Navhome>
            <Head>
                <title>Galvanic Cells | Alknos</title>
            </Head>
            <main id="galvanicCell" className="p-10" >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <header>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Celdas Galvánicas</h1>
                    </header>
                    <form
                        id="stoichiometry"
                        onSubmit={createGalvanicCell}
                        className="p-5">
                        <p className="text-xl font-extralight leading-tight tracking-tight text-gray-900">

                        </p>
                        <fieldset>
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">


                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Metal 1
                                    </dt>
                                    <input
                                        type="text"
                                        name="electrode1"
                                        id="electrode1"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="Pb"
                                        onChange={handleChange}
                                        value={formData.electrode1}
                                        required />

                                </div>

                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Metal 2
                                    </dt>
                                    <input
                                        type="text"
                                        name="electrode2"
                                        id="electrode2"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="Zn"
                                        onChange={handleChange}
                                        value={formData.electrode2}
                                        required />
                                </div>


                            </dl>
                        </fieldset>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6">
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6"></div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6"></div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6"></div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6"></div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6"></div>
                            <div className="overflow-hidden rounded-lg justify-end bg-white px-5 py-8 sm:p-6">
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Calcular
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </dl>
                    </form>

                    {galvanicCell !== null && (
                        <>
                            <div className="p-5">
                                <h1 className="text-xl leading-tight tracking-tight text-gray-900">Celda Galvánica:</h1>
                            </div>
                            <img src={`data:image/png;base64,${galvanicCell}`} alt="Imagen" />
                        </>
                    )}

                </div>
            </main>
        </Navhome>
    )
}