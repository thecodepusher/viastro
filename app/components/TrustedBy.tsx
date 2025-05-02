const stats = [
  { id: 1, name: "", value: "Full insurance include" },
  { id: 2, name: "", value: "No hidden costs" },
  { id: 3, name: "Satisfied users", value: "99.9%" },
  { id: 4, name: "years of experience", value: "5+" },
];

export default function TrustedBy() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Why choose Viastro?
            </h2>
            {/* <p className="mt-4 text-lg/8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p> */}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-pl/20 p-8">
                <dt className="text-sm/6 font-semibold text-pd">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
