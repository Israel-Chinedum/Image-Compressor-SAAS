import Seo from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Seo
        title="Squeeze - 404"
        url={window.location.href}
        description="The page you are looking for does not exist on Squeeze. Return to our homepage to compress your JPEG and PNG images instantly and securely.
"
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-24 text-center">
        <p className="font-mono text-sm text-(--fg-muted)">404</p>
        <h1 className="text-2xl font-bold">
          That page got compressed a bit too much.
        </h1>
        <Link
          to="/"
          className="rounded-full bg-signal-deep px-5 py-2 text-sm font-semibold text-white dark:bg-signal dark:text-ink"
        >
          Back to Compress
        </Link>
      </div>
    </>
  );
}
