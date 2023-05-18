import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";
import { FaWaveSquare, FaBolt, FaSignal } from 'react-icons/fa';

export default function GalvanicCells() {

    const [acidity, setAcidity] = useState(null)
    const [formAcidityPH, setFormAcidityPH] = useState({
        value: "",
    });
    const [formAcidityPOH, setFormAcidityPOH] = useState({
        value: "",
        power: ""
    });
    const [formAcidityH, setFormAcidityH] = useState({
        value: "",
        power: ""
    });
    const [formAcidityOH, setFormAcidityOH] = useState({
        value: "",
        power: ""
    });

    const handlePHChange = (event) => {
        setFormAcidityPH({
            ...formAcidityPH,
            [event.target.name]: event.target.value,
        });
    };
    const handlePOHChange = (event) => {
        setFormAcidityPOH({
            ...formAcidityPOH,
            [event.target.name]: event.target.value,
        });
    };
    const handleHChange = (event) => {
        setFormAcidityH({
            ...formAcidityH,
            [event.target.name]: event.target.value,
        });
    };
    const handleOHChange = (event) => {
        setFormAcidityOH({
            ...formAcidityOH,
            [event.target.name]: event.target.value,
        });
    };

    const calculateAcidity = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        axios
            .post("http://127.0.0.1:8000/api/v1.0/acidity-calculation", formData)
            .then((response) => {
                let data = response.data;
                setAcidity(data)
                console.log(acidity)
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
                <title>Acidity | Alknos</title>
            </Head>
            <main id="Acidity" className="p-10" >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <header>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Calculadora de Acidez</h1>
                    </header>

                    <form
                        id="pH"
                        onSubmit={calculateAcidity}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Potencial Hidrógeno (pH)
                                    </dt>
                                    <input
                                        type="number"
                                        name="value"
                                        id="value"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="7.2"
                                        min={"0"}
                                        max={"14"}
                                        onChange={handlePHChange}
                                        value={formAcidityPH.value}
                                        required />
                                    <input type="hidden" name="property" id="property" value="pH" />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Calcular acidez con Potencial Hidrógeno (pH)
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>

                    <form
                        id="pOH"
                        onSubmit={calculateAcidity}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Potencial Aniones Hidroxilo (pOH)
                                    </dt>
                                    <input
                                        type="number"
                                        name="value"
                                        id="value"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="3"
                                        onChange={handlePOHChange}
                                        value={formAcidityPOH.value}
                                        min={"1"}
                                        required />
                                    <input type="hidden" name="property" id="property" value="pOH" />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Calcular acidez con Potencial Aniones Hidroxilo (pOH)
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>

                    <form
                        id="H"
                        onSubmit={calculateAcidity}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Ión de Hidrógeno [H+]
                                    </dt>
                                    <input
                                        type="number"
                                        name="value"
                                        id="value"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="2"
                                        onChange={handleHChange}
                                        value={formAcidityH.value}
                                        required />
                                    <input type="hidden" name="property" id="property" value="H" />
                                </div>
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Potencia de la magnitud
                                    </dt>
                                    <input
                                        type="number"
                                        name="power"
                                        id="power"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="7"
                                        onChange={handleHChange}
                                        value={formAcidityH.power}
                                        step={"1"}
                                        min={"1"}
                                        required />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                                    Calcular acidez con Ión de Hidrógeno [H+]
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>

                    <form
                        id="OH"
                        onSubmit={calculateAcidity}
                        className="p-5">
                        <fieldset className="px-48">
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Anión de Hidróxilo [OH-]
                                    </dt>
                                    <input
                                        type="number"
                                        name="value"
                                        id="value"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="2"
                                        onChange={handleOHChange}
                                        value={formAcidityOH.value}
                                        required />
                                    <input type="hidden" name="property" id="property" value="H" />
                                </div>
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">
                                        Potencia de la magnitud
                                    </dt>
                                    <input
                                        type="number"
                                        name="power"
                                        id="power"
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder="7"
                                        onChange={handleOHChange}
                                        value={formAcidityOH.power}
                                        step={"1"}
                                        min={"1"}
                                        required />
                                    <input type="hidden" name="property" id="property" value="OH" />
                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                                    Calcular acidez con Ión de Hidrógeno [H+]
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </dl>
                        </fieldset>
                    </form>



                    {acidity !== null && (
                        <>
                            <div className="p-16 flex justify-center">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">Propiedades de Acidez</h1>
                            </div>
                            <div className="flex justify-center">
                                <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 bg-teal-500 text-white">Propiedad</th>
                                                <th className="py-2 px-4 bg-teal-500 text-white">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(acidity).map(([key, value]) => (
                                                <tr key={key} className={value === 'acidic' ? 'bg-red-200 hover:bg-gray-100' : 'bg-blue-200 hover:bg-gray-100'}>
                                                    <td className="py-2 px-4 border-b border-gray-200">{key}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </Navhome>
    )
}