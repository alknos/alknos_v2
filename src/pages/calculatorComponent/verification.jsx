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
            "compounds",
            formValue.reactive1 + " + " + formValue.reactive2 + "-->" + formValue.product1 + " + " + formValue.product2
        );
        compound.push({ id: 1, name: formValue.reactive1 })
        compound.push({ id: 2, name: formValue.reactive2 })
        compound.push({ id: 3, name: formValue.product1 })
        compound.push({ id: 4, name: formValue.product2 })

        axios
            .post("http://127.0.0.1:8000/api/v1.0/verifyBalance", formData)
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
                <form id="verifyBalance">
                    <div>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-7">
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Reactivo 1</dt>
                                <input
                                    type="text"
                                    name='reactive1'
                                    id='reactive1'
                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Reactivo 1'
                                />
                            </div>
                            <div className="overflow-hidden text-center rounded-lg text-3xl bg-white px-5 py-8 ">
                                +
                            </div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Reactivo 2</dt>
                                <input
                                    type="text"
                                    name='reactive2'
                                    id='reactive2'
                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Reactivo 2'
                                />
                            </div>
                            <div className="overflow-hidden text-center rounded-lg text-3xl bg-white px-5 py-8 ">
                                →
                            </div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Producto 1</dt>
                                <input
                                    type="text"
                                    name='product1'
                                    id='product1'
                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Producto 1'
                                />
                            </div>
                            <div className="overflow-hidden text-center rounded-lg text-3xl bg-white px-5 py-8 ">
                                +
                            </div>
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Producto 2</dt>
                                <input
                                    type="text"
                                    name='product2'
                                    id='product2'
                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                    placeholder='Producto 2'
                                />
                            </div>
                        </dl>
                    </div>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-6">
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">

                        </div>
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">

                        </div>
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">

                        </div>
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">

                        </div>
                        <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">

                        </div>
                        <div className="overflow-hidden rounded-lg justify-end bg-white px-5 py-8 sm:p-6">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Verificar
                                <BeakerIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
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