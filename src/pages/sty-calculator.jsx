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
                    </div>
                </header>
                <VerifyBalance />
            </div >
        </Navhome>
    );
}