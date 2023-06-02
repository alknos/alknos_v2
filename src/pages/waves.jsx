import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";
import { FaWaveSquare, FaBolt, FaSignal } from 'react-icons/fa';

export default function GalvanicCells() {

    const [waveProperties, setWaveProperties] = useState(null)
    const [formFrecuency, setFormFrecuency] = useState({
        value: "",
        power: ""
    });
    const [formWavelength, setFormWavelength] = useState({
        value: "",
        power: ""
    });
    const [formEnergy, setFormEnergy] = useState({
        value: "",
        power: ""
    });

    const handleFrecuencyChange = (event) => {
        setFormFrecuency({
            ...formFrecuency,
            [event.target.name]: event.target.value,
        });
    };

    const handleWavelengthChange = (event) => {
        setFormWavelength({
            ...formWavelength,
            [event.target.name]: event.target.value,
        });
    };

    const handleEnergyChange = (event) => {
        setFormEnergy({
            ...formEnergy,
            [event.target.name]: event.target.value,
        });
    };

    const calculateWavelength = (event) => {
        event.preventDefault();

        const formWavelength = new FormData(event.target);
        formWavelength.append('property', 'wavelength')

        axios
            .post("http://34.125.67.36:8000/api/v1.0/electromagnetic-wave", formWavelength)
            .then((response) => {
                let data = response.data;
                console.log(data)
                setWaveProperties(data)

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

    const calculateEnergy = (event) => {
        event.preventDefault();

        const formEnergy = new FormData(event.target);
        formEnergy.append('property', 'energy')

        axios
            .post("http://34.125.67.36:8000/api/v1.0/electromagnetic-wave", formEnergy)
            .then((response) => {
                let data = response.data;
                setWaveProperties(data)
                console.log(waveProperties)
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

    const calculateFrequency = (event) => {
        event.preventDefault();

        const formFrecuency = new FormData(event.target);
        formFrecuency.append('property', 'frequency')

        axios
            .post("http://34.125.67.36:8000/api/v1.0/electromagnetic-wave", formFrecuency)
            .then((response) => {
                let data = response.data;
                setWaveProperties(data)
                console.log(waveProperties !== null)
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
            <main id="galvanicCell" className="p-10">
                <div className="mx-auto max-w-7xl px-4">
                    <header>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-8">
                            Ondas Electromagnéticas
                        </h1>
                    </header>

                    <form id="frequency" onSubmit={calculateFrequency} className="p-5">
                        <fieldset className="px-4">
                            <div className="mb-4">
                                <label htmlFor="frequencyValue" className="text-sm font-medium text-gray-500">
                                    Frecuencia de la onda (Hz)
                                </label>
                                <input
                                    type="number"
                                    name="value"
                                    id="frequencyValue"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="7.2"
                                    onChange={handleFrecuencyChange}
                                    value={formFrecuency.value}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="frequencyPower" className="text-sm font-medium text-gray-500">
                                    Potencia de la magnitud
                                </label>
                                <input
                                    type="number"
                                    name="power"
                                    id="frequencyPower"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="7"
                                    onChange={handleFrecuencyChange}
                                    value={formFrecuency.power}
                                    min="1"
                                    step="1"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full"
                            >
                                Calcular onda electromagnética con frecuencia
                                <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </button>
                        </fieldset>
                    </form>

                    <form id="wavelength" onSubmit={calculateWavelength} className="p-5">
                        <fieldset className="px-4">
                            <div className="mb-4">
                                <label htmlFor="wavelengthValue" className="text-sm font-medium text-gray-500">
                                    Longitud de la onda (m)
                                </label>
                                <input
                                    type="number"
                                    name="value"
                                    id="wavelengthValue"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="3"
                                    onChange={handleWavelengthChange}
                                    value={formWavelength.value}
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="wavelengthPower" className="text-sm font-medium text-gray-500">
                                    Potencia de la magnitud
                                </label>
                                <input
                                    type="number"
                                    name="power"
                                    id="wavelengthPower"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="7"
                                    step="1"
                                    onChange={handleWavelengthChange}
                                    value={formWavelength.power}
                                    min="1"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
                            >
                                Calcular onda electromagnética con su longitud de onda
                                <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </button>
                        </fieldset>
                    </form>

                    <form id="energy" onSubmit={calculateEnergy} className="p-5">
                        <fieldset className="px-4">
                            <div className="mb-4">
                                <label htmlFor="energyValue" className="text-sm font-medium text-gray-500">
                                    Energía de la onda (J)
                                </label>
                                <input
                                    type="number"
                                    name="value"
                                    id="energyValue"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="2"
                                    min="1"
                                    onChange={handleEnergyChange}
                                    value={formEnergy.value}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="energyPower" className="text-sm font-medium text-gray-500">
                                    Potencia de la magnitud
                                </label>
                                <input
                                    type="number"
                                    name="power"
                                    id="energyPower"
                                    className="block w-full border-gray-300 rounded-md bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder="7"
                                    onChange={handleEnergyChange}
                                    value={formEnergy.power}
                                    step="1"
                                    min="1"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 w-full"
                            >
                                Calcular onda electromagnética con su energía
                                <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </button>
                        </fieldset>
                    </form>

                    {waveProperties !== null && (
                        <>
                            <div className="p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 text-center mb-8">
                                    Datos de la Ondas Electromagnéticas
                                </h1>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 bg-blue-500 text-white text-left">
                                                    <FaWaveSquare className="inline-block mr-2" />
                                                    Longitud de onda
                                                </th>
                                                <th className="py-2 px-4 bg-green-500 text-white text-left">
                                                    <FaSignal className="inline-block mr-2" />
                                                    Frecuencia
                                                </th>
                                                <th className="py-2 px-4 bg-yellow-500 text-white text-left">
                                                    <FaBolt className="inline-block mr-2" />
                                                    Energía
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2 px-4 text-black text-left">{waveProperties.wavelength} m</td>
                                                <td className="py-2 px-4 text-black text-left">{waveProperties.frequency} Hz</td>
                                                <td className="py-2 px-4 text-black text-left">{waveProperties.energy} J</td>
                                            </tr>
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