import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router";
import { Input } from "@/components/ui/input";
import { Building2, Mail, Phone, Send, Zap, UserRound } from "lucide-react";
import { toast } from "sonner";
import {
  iconBadge,
  sectionContainer,
  sectionSubtitle,
  sectionTitle,
} from "./styles";
import type { LongTermRentalCopy } from "./types";

type Props = {
  content: LongTermRentalCopy;
  langCode: string;
};

export function LongTermContact({ content, langCode }: Props) {
  const [activeTab, setActiveTab] = useState<"business" | "individual">(
    "business"
  );
  const fetcher = useFetcher();
  const [formData, setFormData] = useState<{
    companyName?: string;
    taxId?: string;
    fullName?: string;
    phone?: string;
    vehicleCount: string;
    email: string;
  }>({
    vehicleCount: "",
    email: "",
  });

  const isSubmitting = fetcher.state === "submitting";

  const fields =
    activeTab === "business"
      ? [
          {
            name: "companyName",
            label: content.companyNameLabel,
            type: "text",
          },
          { name: "taxId", label: content.taxIdLabel, type: "number" },
          {
            name: "vehicleCount",
            label: content.vehicleCountLabel,
            type: "number",
          },
          { name: "email", label: content.contactEmailLabel, type: "email" },
        ]
      : [
          { name: "fullName", label: content.fullNameLabel, type: "text" },
          { name: "phone", label: content.phoneLabel, type: "tel" },
          {
            name: "vehicleCount",
            label: content.vehicleCountLabel,
            type: "number",
          },
          { name: "email", label: content.contactEmailLabel, type: "email" },
        ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.success) {
        toast.success(content.toastSuccessMessage);
        setFormData({
          vehicleCount: "",
          email: "",
        });
      } else if (fetcher.data.error) {
        toast.error(fetcher.data.error || content.toastErrorSending);
      }
    }
  }, [fetcher.data, fetcher.state, content]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const vehicleCount = parseInt(formData.vehicleCount, 10);

    if (isNaN(vehicleCount) || vehicleCount <= 0) {
      toast.error(content.toastErrorInvalidVehicleCount);
      return;
    }

    if (!formData.email) {
      toast.error(content.toastErrorEmailRequired);
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("type", activeTab);
    if (formData.companyName) {
      formDataToSubmit.append("companyName", formData.companyName);
    }
    if (formData.taxId) {
      formDataToSubmit.append("taxId", formData.taxId);
    }
    if (formData.fullName) {
      formDataToSubmit.append("fullName", formData.fullName);
    }
    if (formData.phone) {
      formDataToSubmit.append("phone", formData.phone);
    }
    formDataToSubmit.append("vehicleCount", vehicleCount.toString());
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("langCode", langCode);

    fetcher.submit(formDataToSubmit, { method: "post" });
  };

  return (
    <section className="relative bg-linear-to-b from-slate-50 via-white to-white pb-16 pt-10">
      <div className={sectionContainer}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-p">
            {content.formTitle}
          </p>
          <h2 className={`${sectionTitle} mt-2`}>{content.formTitle}</h2>
          <p className={sectionSubtitle}>{content.formSubtitle}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-p/10 ring-1 ring-gray-100">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative bg-linear-to-br from-p via-p/90 to-p/80 p-8 text-white">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white blur-3xl" />
                <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
              </div>
              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                  <Zap className="size-5" />
                  {content.formTitle}
                </div>
                <h3 className="text-2xl font-bold leading-tight">
                  {content.ctaTitle}
                </h3>
                <p className="text-white/80">{content.ctaSubtitle}</p>
                <div className="space-y-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <ContactRow
                    icon={<Phone className="size-5" />}
                    label={content.contactPhoneLabel}
                    value={content.contactPhoneValue}
                  />
                  <ContactRow
                    icon={<Mail className="size-5" />}
                    label={content.contactEmailLabel}
                    value={content.contactEmailValue}
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center sm:justify-start justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("business")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "business"
                      ? "bg-p text-white shadow-lg shadow-p/30"
                      : "bg-slate-100 text-gray-800 hover:bg-slate-200"
                  }`}>
                  <Building2 className="size-5" />
                  {content.tabBusiness}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("individual")}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === "individual"
                      ? "bg-p text-white shadow-lg shadow-p/30"
                      : "bg-slate-100 text-gray-800 hover:bg-slate-200"
                  }`}>
                  <UserRound className="size-5" />
                  {content.tabIndividual}
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((field) => (
                    <label
                      key={field.name}
                      htmlFor={field.name}
                      className="block space-y-2 rounded-2xl border border-gray-100 bg-slate-50/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-p/40 hover:shadow-md">
                      <span className="text-sm font-semibold text-gray-700">
                        {field.label}
                      </span>
                      <Input
                        id={field.name}
                        required
                        name={field.name}
                        type={field.type}
                        value={
                          formData[field.name as keyof typeof formData] || ""
                        }
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                    </label>
                  ))}
                </div>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={iconBadge}>
                      <Send className="size-5 min-w-5 min-h-5" />
                    </div>
                    <span>{content.heroHighlightSupport}</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:min-w-40 flex flex-row justify-center items-center gap-2 rounded-full bg-linear-to-r from-p via-p to-p/90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-p/30 transition hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send className="size-5 min-w-5 min-h-5" />
                    {isSubmitting ? "Šalje se..." : content.submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-white ring-1 ring-white/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-white/70">{label}</p>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
