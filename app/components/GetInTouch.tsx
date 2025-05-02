export default function GetInTouch() {
  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900">
                Get in touch
              </h2>
              {/* <p className="mt-4 text-base/7 text-gray-600">
                Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac
                pellentesque.
              </p> */}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Working hours
                </h3>
                <dl className="mt-3 space-y-1 text-sm/6 ">
                  <div className="text-s font-bold">
                    <dd>Monday - Friday</dd>
                  </div>
                  <div className="mt-1">
                    <dd>8.00 - 20.00</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Phone
                </h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dd className="font-semibold text-s">
                      Reservation Support
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dd>+1 (555) 905-3456</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Email
                </h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dd className="font-semibold text-s">
                      Reservation Support
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dd>office@viastro.rs</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Instagram
                </h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dd className="font-semibold text-s">
                      Reservation Support
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dd>viastro</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Novi Beograd
                </h3>
                <address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
                  <p>4556 Brendan Ferry</p>
                </address>
              </div>

              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Aerodrom Nikola Tesla
                </h3>
                <address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
                  <p>Beograd</p>
                </address>
              </div>
              {/* <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Say hello
                </h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        href="mailto:hello@example.com"
                        className="font-semibold text-indigo-600"
                      >
                        hello@example.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-5678</dd>
                  </div>
                </dl>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
