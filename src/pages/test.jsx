<div className="border-t border-gray-200">
  <dl>
    {data.map((item, index) => {
      if (item.name === "Chemical Safety") {
        return (
          <div
            className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            key={index}
          >
            <dt className="text-sm font-medium text-gray-500">
              {item.description}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img src={item.url} alt={item.description} />
            </dd>
          </div>
        );
      } else {
        return null;
      }
    })}
  </dl>
</div>