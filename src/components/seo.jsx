import Head from "next/head";

const SEO = ({ pageTitle }) => (
  <>
    <Head>
      <title>{pageTitle && `${pageTitle}`}</title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="description"
        content="Discover the power of Maniax Lab Dashboard - Your one-stop solution for managing projects, tracking analytics, and unleashing the potential of your digital ventures."
      />
      <meta name="robots" content="noindex, follow" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  </>
);

export default SEO;
