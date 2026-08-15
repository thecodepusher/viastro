interface SEOProps {
  schemas: object[];
}

export default function SEO({ schemas }: SEOProps) {
  return (
    <>
      {schemas.map((schema) => {
        const serializedSchema = JSON.stringify(schema).replace(
          /</g,
          "\\u003c",
        );

        return (
          <script
            key={serializedSchema}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializedSchema }}
          />
        );
      })}
    </>
  );
}
