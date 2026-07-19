import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function Seo({
  title,
  description = "Compress images instantly in your browser - no uploads, no waiting. Squeeze reduces JPEG, PNG, and WebP file sizes while keeping the quality you need.",
  keywords = "image compressor, compress, jpg, compress png, reduce image file size, online image compression, webp converter",
  image = "https://fastidious-gingersnap-eb4d73.netlify.app/favicon.png",
  url = "https://fastidious-gingersnap-eb4d73.netlify.app/",
}: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}
