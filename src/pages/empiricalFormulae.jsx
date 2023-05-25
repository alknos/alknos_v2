import { CalculatorIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";

export default function Electrolysis() {
    const [empiricalFormula, setEmpiricalFormula] = useState('');
    const [chemicals, setChemicals] = useState([
        { symbol: '', percentage: '' },
        { symbol: '', percentage: '' }
    ]);

    const addChemical = () => {
        setChemicals([...chemicals, { symbol: '', percentage: '' }]);
    };

    const removeChemical = (index) => {
        const updatedChemicals = [...chemicals];
        updatedChemicals.splice(index, 1);
        setChemicals(updatedChemicals);
    };

    const handleChange = (index, field, value) => {
        const updatedChemicals = [...chemicals];
        updatedChemicals[index][field] = value;
        setChemicals(updatedChemicals);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const sumOfPercentages = chemicals.reduce((total, chemical) => {
            return total + parseFloat(chemical.percentage || 0);
          }, 0);
      
          if (sumOfPercentages !== 100) {
            new swal({
                title: "Error",
                icon: "error",
                text: "La suma de los porcentajes debe ser 100"
            });
            return;
          }

        const data = {
            elements: chemicals.map(({ symbol, percentage }) => ({
                symbol,
                percentage: parseFloat(percentage)
            }))
        };

        axios
            .post('http://34.125.67.36:8000/api/v1.0/empirical-formula', data)
            .then(response => {
                console.log('Formulario enviado con éxito:', response.data);
                const { empirical_formula } = response.data;
                setEmpiricalFormula(empirical_formula)
                console.log(empiricalFormula);
            })
            .catch((error) => {
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
                    </header>

                    <main id="stoichiometry" className="p-10" >
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <header>
                                <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Datos de la reacción</h1>
                            </header>
                            <form
                                id="empiricalFormula"
                                onSubmit={handleSubmit}
                                className="p-5" >

                                {chemicals.map((chemical, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <input
                                            type="text"
                                            className="border rounded-l px-4 py-2 w-1/2"
                                            placeholder="Símbolo químico"
                                            value={chemical.symbol}
                                            onChange={(e) => handleChange(index, 'symbol', e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="border rounded-r px-4 py-2 w-1/2"
                                            placeholder="Porcentaje"
                                            value={chemical.percentage}
                                            onChange={(e) => handleChange(index, 'percentage', e.target.value)}
                                        />
                                        {index >= 2 && (
                                            <button
                                                type="button"
                                                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                                                onClick={() => removeChemical(index)}
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {chemicals.length < 4 && (
                                    <button
                                        type="button"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                                        onClick={addChemical}
                                    >
                                        Agregar
                                    </button>
                                )}

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

                    {empiricalFormula !== '' && (
                        <>
                            <h1 className="text-3xl font-light leading-tight tracking-tight text-gray-900">La formula empírica es: {empiricalFormula}</h1>
                        </>
                    )}

                </div>
            </main>
        </Navhome>
    )
}