import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function InorganicCalculator() {
    var arrayData = []
    const [formValue, setformValue] = React.useState({
        reactive1: "",
        reactive2: "",
    });
    //Información de productos
    const [product1, setProduct1] = useState("Producto 1");
    const [product2, setProduct2] = useState("Producto 2");
    const [nomSis_product1, setNomSis_product1] = useState("-");
    const [nomStock_product1, setNomStock_product1] = useState("-");
    const [nomTrad_product1, setNomTrad_product1] = useState("-");
    const [tipo_product1, setTipo_product1] = useState("-");
    const [nomSis_product2, setNomSis_product2] = useState("-");
    const [nomStock_product2, setNomStock_product2] = useState("-");
    const [nomTrad_product2, setNomTrad_product2] = useState("-");
    const [tipo_product2, setTipo_product2] = useState("-");

    const assignData = (compoundData) => {
        //Producto 1
        setProduct1(compoundData[0].formula);
        if (compoundData[0].properties !== null) {
            setNomSis_product1(compoundData[0].properties.nomenclatura_sistematica)
            setNomStock_product1(compoundData[0].properties.nomenclatura_stock)
            setNomTrad_product1(compoundData[0].properties.nomenclatura_tradicional)
            setTipo_product1(compoundData[0].properties.tipo_compuesto)
        }
        console.log(compoundData[1].formula === 'H2O')
        //Producto 2
        setProduct2(compoundData[1].formula);
        if (compoundData[1].properties !== null) {
            setNomSis_product2(compoundData[1].properties.nomenclatura_sistematica)
            setNomStock_product2(compoundData[1].properties.nomenclatura_stock)
            setNomTrad_product2(compoundData[1].properties.nomenclatura_tradicional)
            setTipo_product2(compoundData[1].properties.tipo_compuesto)
        }
        else {
            setNomSis_product2("No Existe")
            setNomStock_product2("No Existe")
            setNomTrad_product2("No Existe")
            setTipo_product2("No Existe")
        }
        if (compoundData[1].formula == 'H2O') {
            setNomSis_product2("monóxido de dihidrógeno")
            setNomStock_product2("óxido de hidrógeno")
            setNomTrad_product2("agua")
            setTipo_product2("anhídrido")
        }

    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append(
            "compounds",
            formValue.reactive1 + " + " + formValue.reactive2
        );

        axios
            .post("http://127.0.0.1:8000/api/v1.0/inorganic-reaction", formData)
            .then((response) => {
                let data = response.data;

                const showProducts = (dataToShow) => {
                    console.log(dataToShow[0])
                    arrayData.push(dataToShow[0])
                        //then
                        dataToShow.shift();
                        
                        if (dataToShow.length >= 1) {
                            showProducts(dataToShow);
                            arrayData.push(dataToShow[0])
                            console.log(arrayData)
                            assignData(arrayData)
                        }
                };

                showProducts(data);


            })
            .catch((error) => {
                new swal({
                    title: "Error",
                    icon: "error",
                    text: JSON.stringify(error.response.data)
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll("{", "")
                        .replaceAll("}", "")
                        .replaceAll(",", "\n")
                        .replaceAll('"', ""),
                });
            });
    };
    return (
        <div className="py-10">
            <header>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Calculadora de Reacciones Inorgánicas</h1>
                </div>
            </header>
            <main id="verification">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form id="verifyBalance" onSubmit={handleSubmit}>
                        <div>
                            <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-7">
                                <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Reactivo 1</dt>
                                    <input
                                        type="text"
                                        name='reactive1'
                                        id='reactive1'
                                        className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder='Reactivo 1'
                                        required
                                        value={formValue.reactive1}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="px-5 py-8 overflow-hidden text-3xl text-center bg-white rounded-lg ">
                                    +
                                </div>
                                <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Reactivo 2</dt>
                                    <input
                                        type="text"
                                        name='reactive2'
                                        id='reactive2'
                                        className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder='Reactivo 2'
                                        required
                                        value={formValue.reactive2}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="px-5 py-8 overflow-hidden text-3xl text-center bg-white rounded-lg ">
                                    →
                                </div>
                                <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Producto 1</dt>
                                    <input
                                        disabled
                                        type="text"
                                        name='product1'
                                        id='product1'
                                        className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder='Producto 1'
                                        value={product1}
                                    />
                                </div>
                                <div className="px-5 py-8 overflow-hidden text-3xl text-center bg-white rounded-lg ">
                                    +
                                </div>
                                <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                    <dt className="text-sm font-medium text-gray-500 truncate">Producto 2</dt>
                                    <input
                                        disabled
                                        type="text"
                                        name='product2'
                                        id='product2'
                                        className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder='Producto 2'
                                        value={product2}
                                    />
                                </div>
                            </dl>
                        </div>
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
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Calcular
                                    <BeakerIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                                </button>
                            </div>
                        </dl>
                    </form>
                </div>
            </main>
            <div className="p-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  ">
                <div className="mx-auto max-w-4xl p-10">
                    <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Información de los productos</h1>
                        </div>
                    </header>
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <th>
                                    <main id="table_product1">
                                        <dl>
                                            <dt>
                                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                                    <div className="px-4 py-5 sm:px-6">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Información del {product1}</h3>
                                                    </div>
                                                    <div className="border-t border-gray-200">
                                                        <dl>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomeclatura Sistemática</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomSis_product1}</dd>
                                                            </div>
                                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomeclatura de Stock</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomStock_product1}</dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomenclatura Tradicional</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomTrad_product1}</dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Tipo de Compuesto</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{tipo_product1}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </dt>
                                        </dl>
                                    </main>
                                </th>
                                <th></th>
                                <th>
                                    <main id="table_product2">
                                        <dl>
                                            <dt>
                                                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                                                    <div className="px-4 py-5 sm:px-6">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Información del {product2}</h3>
                                                    </div>
                                                    <div className="border-t border-gray-200">
                                                        <dl>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomeclatura Sistemática</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomSis_product2}</dd>
                                                            </div>
                                                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomeclatura de Stock</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomStock_product2}</dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Nomenclatura Tradicional</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{nomTrad_product2}</dd>
                                                            </div>
                                                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                                <dt className="text-sm font-medium text-gray-500">Tipo de Compuesto</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{tipo_product2}</dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </dt>
                                        </dl>
                                    </main>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}