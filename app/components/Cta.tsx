import type { BaseLocale } from "@/locales/base-locale";
import { Link } from "react-router";

export default function Cta(props: { lang: BaseLocale }) {
  return (
    <div className="bg-p">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            Hit the Road Without Worries!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-pd">
            Rent a reliable car quickly and easily – book your vehicle today and
            enjoy a stress-free drive.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/reservation"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-s shadow-xs hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
