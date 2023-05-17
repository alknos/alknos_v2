import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";

export default function GalvanicCells() {

    const [galvanicCell, setGalvanicCell] = useState(null);
    const [formFrecuency, setFormFrecuency] = useState({
        frequency: "",
    });
    const [formWavelength, setFormWavelength] = useState({
        wavelength: "",
    });
    const [formEnergy, setFormEnergy] = useState({
        energy: "",
    });

    const handleFrecuencyChange = (event) => {
        setFormData({
            ...formFrecuency,
            [event.target.name]: event.target.value,
        });
    };

    const handleWavelengthChange = (event) => {
        setFormData({
            ...formWavelength,
            [event.target.name]: event.target.value,
        });
    };

    const handleEnergyChange = (event) => {
        setFormData({
            ...formEnergy,
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
                <title>Waves | Alknos</title>
            </Head>
            <main id="galvanicCell" className="p-10" >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <header>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Ondas Electromagnéticas</h1>
                    </header>
                    
                    <form
                        id="frequency"
                        onSubmit={createGalvanicCell}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Frecuencia de la onda (Hz)
                                    </dt>
                                    <input
                                        type="text"
                                        name="frequency"
                                        id="frequency"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="Zn"
                                        onChange={handleFrecuencyChange}
                                        value={formFrecuency.frequency}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Calcular onda electromagnética con frecuencia
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>

                    <form
                        id="wavelength"
                        onSubmit={createGalvanicCell}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Longitud de la onda  (m)
                                    </dt>
                                    <input
                                        type="text"
                                        name="wavelength"
                                        id="wavelength"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="Zn"
                                        onChange={handleWavelengthChange}
                                        value={formWavelength.wavelength}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Calcular onda electromagnética con su longitud de onda
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>

                    <form
                        id="energy"
                        onSubmit={createGalvanicCell}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Energía de la onda (J)
                                    </dt>
                                    <input
                                        type="text"
                                        name="energy"
                                        id="energy"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="Zn"
                                        onChange={handleEnergyChange}
                                        value={formEnergy.energy}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                                    Calcular onda electromagnética con su energía
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
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