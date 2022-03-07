import MetaTags from "react-meta-tags";
import { ReactTitle } from "react-meta-tags";

function HeaderMetaTags({ metaTags }) {
  const defaults = {
    title: "Endala: A Stargaze NFT Project",
    description: "A generative art project written in p5js.",
    image: "https://files.endala.xyz/hero/hero5.jpg",
  };
  const meta = metaTags || {};

  const tags = { ...defaults, ...meta };

  return (
    <MetaTags>
      <ReactTitle title={tags.title} />
      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={tags.title} />
      <meta property="og:description" content={tags.description} />
      <meta property="og:image" content={tags.image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href} />
      <meta property="twitter:title" content={tags.title} />
      <meta property="twitter:description" content={tags.description} />
      <meta property="twitter:image" content={tags.image} />
    </MetaTags>
  );
}

export default HeaderMetaTags;
