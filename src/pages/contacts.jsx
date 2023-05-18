import Footer from "./landing_Components/footer";
import Navbar from "./navbar";

export default function Contacts() {
  return (
    <>
      <Navbar />
      <div className="relative bg-white">

        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-light tracking-tight text-gray-900 sm:text-3xl">Contáctanos</h2>
              <p className="mt-3 text-lg leading-6 font-extralight text-gray-500">
                Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros. Estaremos encantados de ayudarte.
              </p>
             
                
              
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="full-name" className="sr-only">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="Nombre completo"
                    id="Nombre completo"
                    autoComplete="name"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Teléfono"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Mensaje"
                    defaultValue={''}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-light text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}
