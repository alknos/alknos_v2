import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";

const timeUnits = [
    { id: '1', unit: 1, name: 'Segundos' },
    { id: '2', unit: 60, name: 'Minutos' },
    { id: '3', unit: 3600, name: 'Horas' }
]

const wUnits = [
    { id: '1', unit: 1, name: 'Gramos' },
    { id: '2', unit: 1000, name: 'Kilogramos' },
    { id: '3', unit: 100000, name: 'Tonelada' },
    { id: '4', unit: 453.592, name: 'Libra' },
    { id: '5', unit: 28.3495, name: 'Onza' },
    { id: '6', unit: 6350.29, name: 'Stone' },
    { id: '7', unit: 0.001, name: 'Miligramo' }
]

export default function Electrolysis() {

    const [electrolysis, setElectrolysis] = useState(null);
    const [formData, setFormData] = useState({
        amps: '',
        compound: '',
        first_seconds: '',
        first_grams: '',
        timeUnit: 1,
        wUnit: 1
    });
    const [formElectro, setFormElectro] = useState({

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const submitElectrolysis = (event) => {
        event.preventDefault();

        const requiredInputs = ['amps', 'compound', 'first_seconds', 'first_grams'];
        const answeredInputs = Object.keys(formData).filter((key) =>
            requiredInputs.includes(key) && formData[key] !== ''
        );

        if (answeredInputs.length < 3 || answeredInputs.length > 3) {
            new swal({
                title: "Error",
                icon: "error",
                text: "Solo ingresa 3 parámetros"
            });
            return;
        }

        const { first_seconds, timeUnit, first_grams, wUnit, amps, compound } = formData;
        const timeResult = first_seconds * timeUnit;
        const wResult = first_grams * wUnit;
        const requestPayload = {
            compound: compound
        };

        if (timeResult !== 0 && timeResult != null) {
            requestPayload.seconds = timeResult;
        }

        if (amps !== 0 && amps != null) {
            requestPayload.amps = parseInt(amps);
        }

        if (wResult !== 0 && wResult != null) {
            requestPayload.grams = wResult;
        }


        axios
            .post("http://34.125.67.36:8000/api/v1.0/calculate-electrolysis", requestPayload)
            .then((response) => {
                let data = response.data;
                console.log(Object.values(data));
                setElectrolysis(data)
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
                <title>Electrolysis | Alknos</title>
            </Head>
            <main id="galvanicCell" className="p-10" >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <header>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Electrólisis</h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Para realizar los cálculos de la electrólisis, se requiere de un compuesto y otros dos parámetros.
                            Asegúrate de proporcionar los valores necesarios antes de calcular.
                        </p>
                    </header>

                    <main id="stoichiometry" className="p-10" >
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <header>
                                <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Datos de la reacción</h1>
                            </header>
                            <form
                                id="electrolysis"
                                onSubmit={submitElectrolysis}
                                className="p-5" >
                                <fieldset>
                                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Compuesto
                                            </dt>
                                            <input
                                                type="text"
                                                name="compound"
                                                id="compound"
                                                className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                placeholder="KMnO4"
                                                required
                                                value={formData.compound}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Amperaje
                                            </dt>
                                            <input
                                                type="number"
                                                name="amps"
                                                id="amps"
                                                min="0.01"
                                                step="0.01"
                                                className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                placeholder="3256"

                                                value={formData.amps}
                                                onChange={handleChange}

                                            />
                                        </div>

                                    </dl>

                                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Tiempo
                                            </dt>
                                            <input
                                                type="number"
                                                name="first_seconds"
                                                id="first_seconds"
                                                min="0"
                                                step="0.01"
                                                className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                placeholder="3256"

                                                value={formData.first_seconds}
                                                onChange={handleChange}

                                            />
                                        </div>

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Unidad de tiempo
                                            </dt>
                                            <select
                                                id="timeUnit"
                                                name="timeUnit"
                                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                defaultValue="1"
                                                onChange={handleChange}
                                            >
                                                {timeUnits.map((uni) => (
                                                    <option key={uni.id} value={uni.unit} defaultValue="">
                                                        {uni.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                    </dl>

                                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Peso
                                            </dt>
                                            <input
                                                type="number"
                                                name="first_grams"
                                                id="first_grams"
                                                min="0"
                                                step="0.01"
                                                className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                placeholder="60"

                                                value={formData.first_grams}
                                                onChange={handleChange}

                                            />
                                        </div>

                                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">
                                                Unidades
                                            </dt>
                                            <select
                                                id="wUnit"
                                                name="wUnit"
                                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                defaultValue="1"
                                                onChange={handleChange}
                                            >
                                                {wUnits.map((uni) => (
                                                    <option key={uni.id} value={uni.unit} defaultValue="">
                                                        {uni.name}
                                                    </option>
                                                ))}
                                            </select>
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
                        </div>
                    </main>

                    {electrolysis != null && (
                        <>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Object.entries(electrolysis).map(([key, value], index) => (
                                        <tr
                                            key={index}
                                            className={`${selectedRow === index ? 'bg-blue-100' : 'hover:bg-gray-100 cursor-pointer'}`}
                                            onClick={() => handleRowClick(index)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                </div>
            </main>
        </Navhome>
    )
}