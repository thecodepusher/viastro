import { useEffect } from "react";

interface SEOProps {
  schemas: object[];
}

export default function SEO({ schemas }: SEOProps) {
  useEffect(() => {
    const existingScripts = document.querySelectorAll(
      "script[data-seo-schema]"
    );
    existingScripts.forEach((script) => script.remove());

    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll("script[data-seo-schema]");
      scripts.forEach((script) => script.remove());
    };
  }, [schemas]);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          data-seo-schema="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
