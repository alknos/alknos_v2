/* This example requires Tailwind CSS v2.0+ */
const stats = [
    { name: 'Formula', stat: '3D' },
    { name: 'Fórmula', stat: '2D' },
  ]
  
  export default function Visualization() {

    return (
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                <h1>{item.stat}</h1>
                
                </dd>
            </div>
          ))}
        </dl>
      </div>
    )
  }