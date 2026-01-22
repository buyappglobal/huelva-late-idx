
import React from 'react';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "Descubre las rutas de senderismo, playas, patrimonio y monumentos naturales de la provincia de Huelva.",
  image = "https://solonet.es/wp-content/uploads/2025/11/Diseno-sin-titulo-26.png",
  url = window.location.href,
  type = 'website'
}) => {
  const siteTitle = "HuelvaLate";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  // Ensure absolute URLs for images
  const fullImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

  return (
    <>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </>
  );
};

export default SEO;
