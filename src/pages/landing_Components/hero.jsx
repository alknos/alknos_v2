import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Float } from "@react-three/drei"
import Atom from "./atom"

export default function Hero() {
    return (
        <div className="relative pt-16 pb-32 overflow-hidden">
            <div className="relative">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                    <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                        <div>
                            <div>
                            </div>
                            <div className="mt-6">
                                <h1 className="font-medium text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                    Misma química.
                                </h1>
                                <br />
                                <h1 className="text-white text-7xl">
                                    Mejor ciencia.
                                </h1>
                                <p className="mt-4 text-lg text-gray-400">
                                    Bienvenido a una nueva forma de ver la química.  Impulsado por IA, ofrecemos las mejores herramientas con los mejores resultados.
                                </p>
                                <div className="mt-8 w-max">
                                    <div class="p-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-400">
                                        <button class="px-6 py-2 rounded-lg bg-black">
                                            <h1 class="px-6 py-2 rounded-lg text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">¡Empieza ya!</h1>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <blockquote>
                            <div>
                            </div>
                            <footer className="mt-3">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                    </div>
                                    <div className="text-base font-medium text-gray-700"></div>
                                </div>
                            </footer>
                        </blockquote>
                    </div>

                    <div className="mt-12 sm:mt-16 lg:mt-0">
                        <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                            <Canvas camera={{ position: [0, 0, 7] }} className="canvas">
                                <Suspense fallback={null}>
                                    <color attach="background" args={['black']} />
                                    <Float speed={4} rotationIntensity={0.2} floatIntensity={2}>
                                    <Atom position={[0, 0, 0]} r={2} g={12} b={12} rBall={2} gBall={9} bBall={16} />
                                    </Float>

                                </Suspense>
                            </Canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}