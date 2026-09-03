export const BUSINESS = {
  name: "Viastro Rent a Car",
  legalName: "Viastro doo Beograd",
  telephone: "+381-69-656-555",
  email: "office@viastro.rs",
  priceRange: "€€",
  streetAddress: "Nehruova 51a",
  postalCode: "11070",
  addressLocality: "Novi Beograd",
  addressRegion: "Beograd",
  addressCountry: "RS",
  latitude: 44.8064,
  longitude: 20.3774,
  mapsUrl: "https://maps.app.goo.gl/3gyS4z6Wy46Wufg9A",
  instagramUrl: "https://www.instagram.com/viastro.rs/",
  weekdayOpens: "08:00",
  weekdayCloses: "16:00",
} as const;

export function formattedAddress(): string {
  return `${BUSINESS.streetAddress}, ${BUSINESS.postalCode} ${BUSINESS.addressLocality}`;
}

export function mapsQuery(): string {
  return `${BUSINESS.name}, ${formattedAddress()}`;
}

export function postalAddressSchema() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.addressCountry,
  };
}

export function geoCoordinatesSchema() {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  };
}
