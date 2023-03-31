import { BeakerIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import swal from "sweetalert2";

const units = [
    { id: '1', unit: 'moles', name: 'Moles' },
    { id: '2', unit: 'molecules', name: 'Moléculas' },
    { id: '3', unit: 'grams', name: 'Gramos' }
]

const compound = [
    { id: 0, name: '' },
    { id: 1, name: 'NaOH' },
    { id: 2, name: 'HCl' },
    { id: 3, name: 'NaCl' },
    { id: 4, name: 'H2O' }

]

export default function VerifyBalance() {
    const [st_answer, setSt_answer] = useState("Resultado Estequiométrico");
    const [formValue, setformValue] = React.useState({
        reactive1: "",
        reactive2: "",
        product1: "",
        product2: "",
    });

    var isDisabled = 'notdisabled'

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const showBalance = () => {
        new swal({
        title: "Ecuación Química",
            text: "La reacción está balanceada"
        })
    }

    const sty_calculate = () => {
        setSt_answer("57.3 Moléculas")
        new swal({
        title: "Ecuación Estequiométrica",
            text: "El resultado es: \nHCl = 57.3 Moléculas"
        })
    }

    const verifyBalance = (event) => {
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
        showBalance()
        isDisabled = 'nodisabled'
        console.log(isDisabled)
        console.log(compound);
        console.log(formValue.reactive1, formValue.reactive2, formValue.product1, formValue.product2)

        /*axios
            .post("http://127.0.0.1:8000/api/v1.0/verify-balance", formData)
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                if (data == true) {
                    isDisabled = notDisabled;
                }
            })
        };*/};

    return (
        <>
            <main id="verification">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form id="verifyBalance" onSubmit={verifyBalance}>
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
                                        required
                                        value={formValue.reactive1}
                                        onChange={handleChange}
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
                                        required
                                        value={formValue.reactive2}
                                        onChange={handleChange}
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
                                        required
                                        value={formValue.product1}
                                        onChange={handleChange}
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
                                        required
                                        value={formValue.product2}
                                        onChange={handleChange}
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
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Verificar
                                    <BeakerIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </dl>
                    </form>
                </div>
            </main>
            <main id="stoichiometry"  onSubmit={sty_calculate}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <header>
                        <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Datos Estequiométricos</h1>
                    </header>
                    <form id="stoichiometry" >
                        <fieldset disabled={isDisabled === "disabled" ? true : false} >
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Compuesto</dt>
                                    <select
                                        id="compound"
                                        name="compound"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        defaultValue="">
                                        {compound.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Cantidad</dt>
                                    <input
                                        type="number"
                                        name='quantity'
                                        id='quantity'
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        placeholder='3256'
                                    />
                                </div>



                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Unidades</dt>
                                    <select
                                        id="unit"
                                        name="unit"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        defaultValue="Mol"
                                    >
                                        {units.map((uni) => (
                                            <option
                                                key={uni.id}
                                                value={uni.unit}
                                            >
                                                {uni.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </dl>
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Compuesto</dt>
                                    <select
                                        id="compound2"
                                        name="compound2"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        defaultValue="">
                                        {compound.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Unidades</dt>
                                    <select
                                        id="unit2"
                                        name="unit2"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        defaultValue="Mol"
                                    >
                                        {units.map((uni) => (
                                            <option
                                                key={uni.id}
                                                value={uni.unit}
                                            >
                                                {uni.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                    <dt className="truncate text-sm font-medium text-gray-500">Cantidad</dt>
                                    <input
                                        disabled
                                        type="text"
                                        name='quantity'
                                        id='quantity'
                                        className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                        value={st_answer}
                                    />
                                </div>
                            </dl>
                        </fieldset>
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
                                    type="submit"
                                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Calcular
                                    <CalculatorIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </dl>
                    </form>
                </div>
            </main>
        </>
    )
}