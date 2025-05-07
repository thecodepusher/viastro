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
                    <dd>8.00 - 16.00</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Phone
                </h3>
                <a href="tel:+4733378901">
                  <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                    <div>
                      <dd className="font-semibold text-s">Dostupan 24/7</dd>
                    </div>
                    <div className="mt-1">
                      <dd>+38169656555</dd>
                    </div>
                  </dl>
                </a>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Email
                </h3>
                <a href="mailto:reservations@viastro.rs">
                  <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                    <div>
                      <dd className="font-semibold text-s">
                        reservations@viastro.rs
                      </dd>
                    </div>
                    <div className="mt-1"></div>
                  </dl>
                </a>
              </div>

              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Instagram
                </h3>
                <a href="https://www.instagram.com/viastro.rs/">
                  <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                    <div>
                      <dd className="font-semibold text-s">viastro.rs</dd>
                    </div>
                    <div className="mt-1">
                      <dd></dd>
                    </div>
                  </dl>
                </a>
              </div>

              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Novi Beograd
                </h3>
                <address className="mt-3 space-y-1 text-sm/6 text-gray-600 not-italic">
                  <p>Danila Lekica Spanca 31, 11070</p>
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
