import { useEffect } from "react";

interface SEOProps {
  schemas: object[];
}

/**
 * SEO Component - Adds JSON-LD schema markup to the page
 * Works both server-side and client-side
 */
export default function SEO({ schemas }: SEOProps) {
  useEffect(() => {
    // Remove existing schema scripts from this component
    const existingScripts = document.querySelectorAll('script[data-seo-schema]');
    existingScripts.forEach((script) => script.remove());

    // Add new schema scripts
    schemas.forEach((schema, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[data-seo-schema]');
      scripts.forEach((script) => script.remove());
    };
  }, [schemas]);

  // Also render schemas server-side for better SEO
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

