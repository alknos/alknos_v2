const compound = [

]

const units = [
    { id: '1', unit: 'moles', name: 'Moles' },
    { id: '2', unit: 'molecules', name: 'Moléculas' },
    { id: '3', unit: 'grams', name: 'Gramos' }
]

export default function Stoichometry() {
    const compoundArray = new Array(compound)
    let isDisabled = 'disabled'

    return (
        <main id="stoichiometry">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header>
                    <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900">Datos Estequiométricos</h1>
                </header>
                <form id="stoichiometry">
                    <fieldset disabled={isDisabled === "disabled" ? true : false} >
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                <dt className="truncate text-sm font-medium text-gray-500">Compuesto</dt>
                                <select
                                    id="compound"
                                    name="compound"
                                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    defaultValue=""
                                >
                                    {compoundArray.map((formula) => (
                                        <option
                                            key={formula.id}
                                            value={formula.name}
                                        >
                                            {formula.name}
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
                    </fieldset>
                </form>
            </div>
        </main>
    )
}