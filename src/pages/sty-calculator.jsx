import React from "react";
import VerifyBalance from "./calculatorComponent/verification";
import Navhome from "./navhome";
import Head from "next/head";


export default function StyCalculator() {

    return (
        <Navhome>
            <Head>
                <title>Stoichiometry Calculator | Alknos</title>
            </Head>
            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Calculadora Estequiométrica</h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Para utilizar la calculadora estequiométrica, es necesario ingresar una ecuación química, ya sea balanceada o no.
                            A partir del peso experimental de un compuesto, podrás calcular el peso de otros compuestos involucrados en la reacción.
                            Además, tendrás la opción de calcular el reactivo limitante utilizando los pesos experimentales de los dos reactivos.
                            Asegúrate de ingresar la información requerida correctamente para obtener los resultados deseados.
                        </p>
                    </div>
                </header>
                <VerifyBalance />
            </div >
        </Navhome>
    );
}