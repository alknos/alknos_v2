import MainLayout from "Layout/MainLayout"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import swal from "sweetalert2";
import Navhome from "./navhome";
import Head from "next/head";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";


function CompoundInfo() {
    const [responseData, setResponseData] = useState([])
    const [arrayChem, setarrayChem] = useState()
    const [Synonym, setSynonym] = useState()

    const router = useRouter();
    const { cid } = router.query;
    useEffect(() => {
        const SearchCompound = async () => {

            const formData = new FormData();
            formData.append(
                "cid", cid
            );
            axios
                .post("http://34.125.67.36:8000/api/v1.0/compound-information", formData)
                .then((response) => {
                    let data = response.data;
                    setResponseData(data);
                    setarrayChem(data.find(item => item.name === "Title").value)
                    setSynonym(Object.values(data.find(item => item.name === "Synonyms").value))

                })
                .catch((error) => {

                });
        };

        SearchCompound()

    }, [router.query]);

    const responseArray = Object.values(responseData);


    var chemSafDisplayed = false;
    var thumnailDisplayed = false;

    const name = "Chemical Safety"
    const name1 = "Synonyms"
    const chemSafInfo = []

    for (let i = 0; i < responseData.length; i++) {
        if (responseData[i].name === name) {
            chemSafInfo.push(responseData[i])
        }
        if (responseData[i].name === name1) {
            responseData[i] = Synonym
        }
    }

    return (
        <Navhome>
            <Head>
                <title>{arrayChem} Information | Alknos</title>
            </Head>
            <div className="p-5 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                <div className="p-10">
                    <header >
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Información de {arrayChem}</h1>
                            <br />
                        </div>
                    </header>
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">

                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Detección de compuesto</h3>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">Información acerca del compuesto detectado.</p>
                        </div>


                        <div className="border-t border-gray-200">
                            <dl>
                                {responseArray.map((item, index) => {
                                    if (
                                        item.name === "2D Thumbnail Structure" ||
                                        item.name === "3D Thumbnail Structure" ||
                                        item.name === "2D Structure"

                                    ) {
                                        return null;  // Excluir los elementos con estos nombres
                                    }

                                    if (item.name === "Chemical Safety" && !chemSafDisplayed) {
                                        chemSafDisplayed = true;

                                        return (
                                            <div
                                                className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                                key={index}>
                                                <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    {chemSafInfo.map((item, index) => {
                                                        return (
                                                            <>
                                                                <div key={index} className="w-32 p-2 bg-white rounded-lg shadow-md">
                                                                    <div className='flex items-center'>
                                                                        <Image
                                                                            className="w-min"
                                                                            src={item.url}
                                                                            alt="2D Structure"
                                                                            width={120}
                                                                            height={120}
                                                                            unoptimized />
                                                                    </div>
                                                                    <div className="p-2">
                                                                        <p className="font-normal text-gray-800  text-md">{item.description}</p>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </>

                                                        );
                                                    })}
                                                </dd>
                                            </div>
                                        );
                                    }
                                    if (item.name === "Synonyms") {
                                        return (
                                            <div
                                                key={index}
                                                className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                            >
                                                <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                    <div>
                                                        {Synonym.map((item, index) => (
                                                            <p key={index}>{item}</p>
                                                        ))}
                                                    </div>

                                                </dd>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div
                                            key={index}
                                            className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                        >
                                            <dt className="text-sm font-medium text-gray-500">{item.name}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {item.value}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </dl>
                        </div>


                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Estructuras del {arrayChem}</h1>
                    <br />
                </div>

                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Estructura en 2D</h3>
                        <p className="max-w-2xl mt-1 text-sm text-gray-500">Visualiza la fórmula taquigráfica del {arrayChem}.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        {responseArray.map((item, index) => {
                            if (item.name === "2D Structure") {
                                chemSafDisplayed = true;
                                return (
                                    <div
                                        id="2D"
                                        key={index}
                                        className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-800">{item.name}</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <Image
                                                className="w-min"
                                                src={item.url}
                                                alt="2D Structure"
                                                width={120}
                                                height={120}
                                                unoptimized />
                                        </dd>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </div>

                    {/*  <div className="border-t border-gray-200">
                            {responseArray.map((item, index) => {
                                if (item.name ==="2D Thumbnail Structure") {
                                    thumnailDisplayed = true;
                                    return (
                                        <div
                                            id="2D"
                                            key={index}
                                            className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-800">{item.name}</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                <Image
                                                    className="w-min"
                                                    src={item.url}
                                                    alt="2D Structure"
                                                    width={120}
                                                    height={120}
                                                    unoptimized />
                                            </dd>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>*/}

                </div>
                <br />
                <br />
                <br />
                {responseArray.map((item, index) => {
                    if (item.name === "3D Thumbnail Structure") {
                        return (
                            <>

                                <div key={index} className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <div className="">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">Estructura en 3D</h3>
                                            <p className="max-w-2xl mt-1 text-sm text-gray-500">Visualiza la fórmula taquigráfica renderizada en 3D del {arrayChem}.</p>
                                        </div>
                                        <div className="relative top-0 right-0 justify-self-end">
                                            <CubeTransparentIcon className="w-16 top-0 text-gray-900" />
                                            <p className="text-gray-900 font-light ps-px">Modelo Interactivo</p>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <iframe className="w-full overflow-hidden h-96" id="3DMol" srcDoc={`<script src="https://3Dmol.org/build/3Dmol-min.js"></script><div id="3D" style="width: 40rem; height:40rem; overflow: hidden;" class='viewer_3Dmoljs' data-cid="${cid}" data-backgroundcolor='0xffffff' data-style='stick'></div>`} width="500" height="500"></iframe>
                            </>
                            
                        );
                    } else {
                        return null;
                    }
                })}
            </div >
        </Navhome>
    )
}


export default CompoundInfo