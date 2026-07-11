import Seo from "@/components/SEO";

export function About() {
  return (
    <>
      <Seo title="Squeeze - About" />
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-16">
        <h1 className="text-4xl font-extrabold">About Squeeze</h1>
        <p className="text-(--fg-muted)">
          Squeeze compresses images entirely inside your browser, using the
          Canvas API and WebAssembly under the hood. Your files never touch a
          server — which means it's fast, private, and free to run at any scale.
        </p>
      </div>
    </>
  );
}
