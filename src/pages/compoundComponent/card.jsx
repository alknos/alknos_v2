import React from "react";

function Card({ data }) {

  return (
    
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0 justify-self-start">
          <img className="w-full object-cover mt-8" src={data["2d_thumbnail"]} alt="Chemical structure thumbnail" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.common_name}</div>
          <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${data.cid}`} target="_blank" rel="noopener noreferrer">
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{data.iupac_name}</h2>
          </a>
          <p className="mt-2 text-gray-500">{`Molecular Formula: ${data.molecular_formula}`}</p>
          <p className="mt-2 text-gray-500">{`Molecular Weight: ${data.molecular_weight}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;