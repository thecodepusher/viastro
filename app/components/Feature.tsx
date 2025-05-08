import { CarIcon } from "lucide-react";
import type { BaseLocale } from "@/locales/base-locale";

interface FeatureProps {
  lang: BaseLocale;
}

export default function Feature({ lang }: FeatureProps) {
  const features = [
    {
      name: "Push to deploy",
      description: lang.featureDesc,
      icon: CarIcon,
    },
    {
      name: "SSL certificates",
      description: lang.featureDesc,
      icon: CarIcon,
    },
    {
      name: "Simple queues",
      description: lang.featureDesc,
      icon: CarIcon,
    },
    {
      name: "Advanced security",
      description: lang.featureDesc,
      icon: CarIcon,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-p">
            {lang.deployFaster}
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-pd sm:text-5xl lg:text-balance">
            {lang.deployDesc}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">{lang.featureDesc}</p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-[#FF9B17]">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
