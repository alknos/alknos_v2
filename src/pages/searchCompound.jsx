import MainLayout from "Layout/MainLayout"
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import axios from "axios";

import Card from "./compoundComponent/card";
import Link from "next/link";
import Navhome from "./navhome";
import Head from "next/head";


function SearchCompound() {
    const [query, setSearchText] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const fetchData = async () => {
        try {
            const formData = new FormData();
            formData.append('query', query);
            const response = await axios.post('http://127.0.0.1:8000/api/v1.0/compound-query', formData);
            setResponseData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setResponseData([]);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(); // Llamar a fetchData al cargar el componente
    }, [query]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        await fetchData();
    };


    return (
        <Navhome>
            <Head>
                <title>Compound Search | Alknos</title>
            </Head>
            <main className="flex-1 pb-8">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-green-600">A L K N O S</h2>
                    </div>
                    <div className="text-center">
                        <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Busca cualquier compuesto
                        </p>
                        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                            Obten información de compuestos para investigaciones y tareas.
                        </p>

                    </div>
                    <div className="p-10 flex items-center justify-center">
                        <div
                            className={`relative flex items-center justify-center w-full max-w-md h-12 bg-gray-100 rounded-md focus-within:bg-gray-200 transition-all duration-300 ease-in-out`}
                        >
                            <input
                                type="text"
                                className={`w-full h-full px-4 text-gray-800 bg-transparent border-0 outline-none appearance-none`}
                                placeholder="Compuesto"
                                onChange={handleChange}
                                value={query}
                            />
                            <button
                                onClick={(e) => handleSubmit(e)}
                            >
                                <MagnifyingGlassIcon
                                    className={`w-6 h-6 p-1 text-gray-600 transition-all duration-300 ease-in-out }`} />
                            </button>
                        </div>
                    </div>


                    {Array.isArray(responseData) ? (
                        responseData.length === 0 ? (
                            <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
                                <div className="md:flex">
                                    <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
                                        No se encontraron resultados.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {responseData.map((compound) => (
                                    <div key={compound.cid} className="p-4 mb-4">
                                        <Link href={`/compoundInfo?cid=${compound.cid}`}>
                                            <Card data={compound} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (

                        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
                            <div className="md:flex">
                                <div className="w-1/3 bg-gray-200 h-40 animate-pulse" />
                                <div className="p-8">
                                    <div className="w-1/2 h-6 bg-gray-200 mb-4 animate-pulse" />
                                    <div className="w-full h-6 bg-gray-200 mb-4 animate-pulse" />
                                    <div className="w-full h-6 bg-gray-200 mb-4 animate-pulse" />
                                    <div className="w-full h-6 bg-gray-200 mb-4 animate-pulse" />
                                </div>
                            </div>
                        </div>



                    )}

                </div>
            </main >
        </Navhome>
    )
}

export default SearchCompound