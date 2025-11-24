import { useEffect } from "react";

interface SEOProps {
  schemas: object[];
}

export default function SEO({ schemas }: SEOProps) {
  useEffect(() => {
    const existingScripts = document.querySelectorAll(
      "script[data-seo-schema]"
    );
    existingScripts.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll("script[data-seo-schema]");
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [schemas]);

  return null;
}
