import type { BaseLocale } from "@/locales/base-locale";

export default function Logos(props: { lang: BaseLocale }) {
  return (
    <div className="bg-[#FFDEB2] py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-pd">
          {props.lang.vehiclesOffer}
        </h2>
      </div>
    </div>
  );
}
