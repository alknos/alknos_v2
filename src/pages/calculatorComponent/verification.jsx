import { BeakerIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Stoichometry from "./stoichometry";

const compound = [

]

export default function VerifyBalance() {
    const [formValue, setformValue] = React.useState({
        reactive1: "",
        reactive2: "",
        product1: "",
        product2: "",
    });

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
            "reaction",
            formValue.reactive1 + " + " + formValue.reactive2 + "-->" + formValue.product1 + " + " + formValue.product2
        );
        compound.push({ id: 1, name: formValue.reactive1 })
        compound.push({ id: 2, name: formValue.reactive2 })
        compound.push({ id: 3, name: formValue.product1 })
        compound.push({ id: 4, name: formValue.product2 })

        axios
            .post(" http://127.0.0.1:8000/api/v1.0/stoichimetry/verify-balance", formData)
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                if (data == true) {
                    let isDisabled = ' '
                }
            })
    };

    return (
        <>
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
                                />
                            </div>
                            <div className="px-5 py-8 overflow-hidden text-3xl text-center bg-white rounded-lg ">
                                →
                            </div>
                            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Producto 1</dt>
                                <input
                                    type="text"
                                    name='product1'
                                    id='product1'
                                    className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Producto 1'
                                />
                            </div>
                            <div className="px-5 py-8 overflow-hidden text-3xl text-center bg-white rounded-lg ">
                                +
                            </div>
                            <div className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Producto 2</dt>
                                <input
                                    type="text"
                                    name='product2'
                                    id='product2'
                                    className="block w-full text-xl border-0 border-b border-transparent bg-gray-50 focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Producto 2'
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
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Verificar
                                <BeakerIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                            </button>
                        </div>
                    </dl>
                </form>
            </div>
        </main>
        <Stoichometry arrayCompound={compound}/>
        </>
    )
}