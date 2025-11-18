import type { BaseLocale } from "@/locales/base-locale";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import GoogleMap from "./GoogleMap";

export default function GetInTouch(props: { lang: BaseLocale }) {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center justify-center gap-2">
        <div className="mx-auto max-w-2xl divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="flex flex-col sm:items-start items-center justify-center">
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900">
                {props.lang.gitTitle}
              </h2>
              <p className="mt-4 sm:text-left text-center text-base/7 text-gray-600">
                {props.lang.gitSubTitle}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-pl/20 border border-pl/30 p-10 transition-colors hover:bg-pl/40">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  Novi Beograd
                </h3>
                <a href="https://maps.app.goo.gl/3gyS4z6Wy46Wufg9A">
                  <address className="mt-2 text-sm/6 text-gray-600 not-italic">
                    <p>Danila Lekica Spanca 31, 11070</p>
                  </address>
                </a>
                <dl className="mt-3 space-y-1 text-sm/6 ">
                  <div className="font-bold">
                    <dd>{props.lang.gitDays}</dd>
                  </div>
                  <div className="mt-1">
                    <dd>8.00 - 16.00</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-pl/20 border border-pl/30 p-10 transition-colors hover:bg-pl/40">
                <h3 className="text-base/7 font-semibold text-gray-900">
                  {props.lang.gitAwailable}
                </h3>
                <a href="tel:+38169656555">
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div className="flex items-center gap-2">
                      <FiPhoneCall size={20} />
                      <dd className="font-semibold">+38169656555</dd>
                    </div>
                  </dl>
                </a>
                <a href="https://www.instagram.com/viastro.rs/">
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div className="flex items-center gap-4">
                      <FaInstagram size={20} />
                      <dd className="font-semibold">viastro.rs</dd>
                    </div>
                  </dl>
                </a>
                <a href="mailto:reservations@viastro.rs">
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div className="flex items-center gap-4">
                      <MdOutlineMarkEmailRead size={20} />
                      <dd className="font-semibold">reservations@viastro.rs</dd>
                    </div>
                  </dl>
                </a>
                <a href="https://wa.me/38169656555">
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div className="flex items-center gap-4">
                      <FaWhatsapp size={20} />
                      <dd className="font-semibold">+38169656555</dd>
                    </div>
                  </dl>
                </a>
                <a href="viber://chat?number=+38169656555">
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div className="flex items-center gap-4">
                      <FaViber size={20} />
                      <dd className="font-semibold">+38169656555</dd>
                    </div>
                  </dl>
                </a>
              </div>
            </div>
          </div>
        </div>
        <GoogleMap />
      </div>
    </div>
  );
}
