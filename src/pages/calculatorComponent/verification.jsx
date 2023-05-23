import { BeakerIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import swal from "sweetalert2";
import axios from "axios";
import { events } from "@react-three/fiber";
import ReactionTable from "./reactionTable";

const units = [
    { id: '1', unit: 'moles', name: 'Moles' },
    { id: '2', unit: 'molecules', name: 'Moléculas' },
    { id: '3', unit: 'grams', name: 'Gramos' }
]

const compound = [

]

export default function VerifyBalance() {
    const [compoundArray, setCompoundArray] = useState([''])
    const [reactives, setReactives] = useState(['']);
    const [products, setProducts] = useState(['']);
    const [reaction, setReaction] = useState('')
    const [formValue, setformValue] = React.useState({
        reactive1: "",
        reactive2: "",
        reactive3: "",
        product1: "",
        product2: "",
        product3: ""
    });
    const [formStoichiometry, setformStoichiometry] = React.useState({
        reaction: "",
        unit: "",
        quantity: "",
        position: ""
    });
    const [formReagent, setformReagent] = React.useState({
        reaction: "",
        unit: "",
        reactive1: "",
        reactive2: ""
    });
    const [compound, setCompound] = React.useState([]); // Define state para los compuestos
    const [stoichiometry_data, setStoichiometryData] = useState([])
    const [all_compounds, setall_compounds] = useState([''])
    const [reactionUser, setReactionUser] = useState([''])
    const [reactiveArray, setReactiveArray] = useState('')
    const [limitingReagent, setlimitingReagent] = useState('')
    const firstreactiveArray = [

    ]

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleStChange = (event) => {
        setformStoichiometry({
            ...formStoichiometry,
            [event.target.name]: event.target.value,
        });
    };

    const handleRChange = (event) => {
        setformReagent({
            ...formReagent,
            [event.target.name]: event.target.value,
        });
    };

    const addReactiveInput = () => {
        if (reactives.length < 3) {
            setReactives([...reactives, '']);
        }
    };

    const removeReactiveInput = (index) => {
        if (reactives.length > 1) {
            const updatedReactives = [...reactives];
            updatedReactives.splice(index, 1);
            setReactives(updatedReactives);
        }
    };

    const handleReactiveChange = (index, value) => {
        const updatedReactives = [...reactives];
        updatedReactives[index] = value;
        setReactives(updatedReactives);
    };

    const addProductInput = () => {
        if (products.length < 3) {
            setProducts([...products, '']);
        }
    };

    const removeProductInput = (index) => {
        if (products.length > 1) {
            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            setProducts(updatedProducts);
        }
    };

    const handleProductChange = (index, value) => {
        const updatedProducts = [...products];
        updatedProducts[index] = value;
        setProducts(updatedProducts);
    };

    function separateCompounds(equation) {
        const compounds = equation.split(/\s*\+\s*|\s*-->\s*/).map(compound => {
            const [, coefficient, elements] = compound.match(/^(\d*)(.*)$/);

            return {
                coefficient: coefficient ? parseInt(coefficient, 10) : 1,
                compound: elements
            };
        });

        return compounds;
    }


    const verifyBalance = (event) => {
        event.preventDefault();
        compound.splice(0, compound.length);

        const formData = new FormData();

        let reactionString = '';

        // Agregar los reactivos
        reactives.forEach((reactive, index) => {
            if (reactive) {
                if (index !== 0) {
                    reactionString += ' + ';
                }
                reactionString += reactive;
                compound.push({ name: reactive.replace(/[^\w\s]/gi, "") })
                firstreactiveArray.push({ name: reactive.replace(/[^\w\s]/gi, "") })

            }
        });

        // Verificar si hay reactivos y productos para agregar la flecha
        if (reactionString && products.length > 0) {
            reactionString += ' --> ';
            setReactiveArray(firstreactiveArray)
        }

        // Agregar los productos
        products.forEach((product, index) => {
            if (product) {
                if (index !== 0) {
                    reactionString += ' + ';
                }
                reactionString += product;
                compound.push({ name: product.replace(/[^\w\s]/gi, "") })
            }
        });

        // Agregar la cadena de reacción al formData
        formData.append('reaction', reactionString);
        setReactionUser(reactionString)

        axios
            .post("http://34.125.31.170:8000/api/v1.0/balance-reaction", formData)
            .then((response) => {
                let data = response.data;
                const reactionValue = data.reaction;
                setReaction(reactionValue)
                const combinedArray = [...reactives, ...products];
                const uniqueCompounds = combinedArray.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                console.log("Unique Compounds"+uniqueCompounds)
                console.log("Combined Array"+combinedArray)
                setCompoundArray(uniqueCompounds)
                setall_compounds(separateCompounds(reactionValue));
                console.log(all_compounds)

            }).catch((error) => {
                if (error.response.data != null) {
                    compound.splice(0, compound.length);
                    setReaction("")
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

    const calculateSt = (event) => {
        event.preventDefault();

        const formDataStoichiometry = new FormData(event.target);


        formDataStoichiometry.append("reaction", reactionUser)

        axios
            .post("http://34.125.31.170:8000/api/v1.0/calculate-stoichiometry", formDataStoichiometry)
            .then((response) => {
                let data = response.data;
                console.log(data);
                setStoichiometryData(data)
                console.log(stoichiometry_data)
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

    const calculateReagent = (event) => {
        event.preventDefault();

        const formDataReagent = new FormData(event.target);


        formDataReagent.append("reaction", reactionUser)

        axios
            .post("http://34.125.31.170:8000/api/v1.0/limiting-reagent", formDataReagent)
            .then((response) => {
                let data = response.data;
                setlimitingReagent("Reactivo Limitante: " + data.limiting_reagent)
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

        <>
            <main id="verification">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form id="verifyBalance" onSubmit={verifyBalance}>
                        <div>
                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-7">
                                {reactives.map((reactive, index) => (
                                    <div key={index} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">Reactivo {index + 1}</dt>
                                        <input
                                            type="text"
                                            name={`reactive${index + 1}`}
                                            id={`reactive${index + 1}`}
                                            className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            placeholder={`Reactivo ${index + 1}`}
                                            required
                                            value={formValue[`reactive.${index + 1}`]}
                                            onChange={(e) => handleReactiveChange(index, e.target.value)}
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                onClick={() => removeReactiveInput(index)}
                                            >
                                                Quitar
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div className="p-8">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 h-16 w-16"
                                        onClick={addReactiveInput}>
                                        +
                                    </button>
                                </div>
                                <div className="overflow-hidden text-center rounded-lg text-3xl bg-white px-5 py-8">→</div>
                                {products.map((product, index) => (
                                    <>
                                        <div key={index} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">Producto {index + 1}</dt>
                                            <input
                                                type="text"
                                                name={`product${index + 1}`}
                                                id={`product${index + 1}`}
                                                className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                                placeholder={`Producto ${index + 1}`}
                                                required
                                                value={formValue[`product.${index + 1}`]}
                                                onChange={(e) => handleProductChange(index, e.target.value)}
                                            />

                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    className="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                    onClick={() => removeProductInput(index)}
                                                >
                                                    Quitar
                                                </button>

                                            )}
                                        </div>
                                    </>
                                ))}
                                <div className="p-8">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 h-16 w-16"
                                        onClick={addProductInput}>
                                        +
                                    </button>
                                </div>
                            </dl>
                        </div>
                        <button
                            type="submit"
                            className="mt-5 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Balancear
                        </button>
                    </form>
                </div>
            </main>

            {setStoichiometryData.length > 0 && (
                <main id="stoichiometry" className="p-10" >
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <header>
                            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Datos Estequiométricos</h1>
                        </header>
                        <form
                            id="stoichiometry"
                            onSubmit={calculateSt}
                            className="p-5"
                        >
                            <p className="text-xl font-extralight leading-tight tracking-tight text-gray-900">
                                {reaction}
                            </p>
                            <fieldset>
                                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Compuesto
                                        </dt>
                                        <select
                                            id="position"
                                            name="position"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue=""
                                            onChange={handleStChange}
                                        >
                                            {compound.map((item, index) => (
                                                <option key={index} value={index + 1}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Cantidad
                                        </dt>
                                        <input
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            min="0"
                                            step="0.01"
                                            className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                            placeholder="3256"
                                            required
                                            value={formStoichiometry.quantity}
                                            onChange={handleStChange}
                                        />
                                    </div>

                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Unidades
                                        </dt>
                                        <select
                                            id="unit"
                                            name="unit"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue="Mol"
                                            onChange={handleStChange}
                                        >
                                            {units.map((uni) => (
                                                <option key={uni.id} value={uni.unit}>
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

                        {stoichiometry_data.length > 0 && (
                            <div className="container mx-auto">
                                <h1 className="text-2xl font-bold mb-4">Datos Estequiométricos de la reacción</h1>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                                Compuesto
                                            </th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                                Gramos
                                            </th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                                Moles
                                            </th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                                                Moleculas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stoichiometry_data.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                                    {all_compounds[index].compound}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                                    {item.grams.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                                    {item.moles.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                                    {item.molecules.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </main>)}

            {reactiveArray.length > 0 && (
                <main id="reagent" className="p-10" >
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <header>
                            <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Reactivo Limitante</h1>
                        </header>
                        <form
                            id="reagent"
                            onSubmit={calculateReagent}
                            className="p-5">
                            <fieldset>
                                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                    {reactiveArray.length > 0 && reactiveArray.map((item, index) => (
                                        <>
                                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                <dt className="truncate text-sm font-medium text-gray-500">
                                                    Reactivo {index + 1}
                                                </dt>
                                                <input
                                                    type="text"
                                                    name={`Reagent${index + 1}`}
                                                    id={`Reagent${index + 1}`}
                                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                    disabled
                                                    required
                                                    value={item.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                                <dt className="truncate text-sm font-medium text-gray-500">
                                                    Cantidad
                                                </dt>
                                                <input
                                                    type="number"
                                                    name={`reagent${index + 1}`}
                                                    id={`reagent${index + 1}`}
                                                    className="block w-full border-0 border-b border-transparent bg-gray-50 text-xl focus:border-green-600 focus:ring-0 sm:text-xl"
                                                    placeholder="3256"
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                    value={formReagent.value}
                                                    onChange={handleChange}
                                                />
                                            </div>


                                        </>
                                    ))}
                                    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                        <dt className="truncate text-sm font-medium text-gray-500">
                                            Unidades
                                        </dt>
                                        <select
                                            id="unit"
                                            name="unit"
                                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            defaultValue="Mol"
                                            onChange={handleChange}
                                        >
                                            {units.map((uni) => (
                                                <option key={uni.id} value={uni.unit}>
                                                    {uni.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </dl>
                            </fieldset>
                            <div className="p-5">
                                <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">{limitingReagent}</h1>
                            </div>
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
            )}

        </>
    )
}