export default function GoogleMap() {
  const address = "Viastro Rent a Car, Nehruova 51a, Beograd 11070";
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address,
  )}&output=embed`;

  return (
    <div className="mt-8 w-full">
      <iframe
        src={embedUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
        title="Google Maps - Nehruova 51a, Novi Beograd"
      />
    </div>
  );
}
