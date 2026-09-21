// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Yongzhi Huang's knowledge dump";
export const SITE_DESCRIPTION =
  "Software Engineer/leader. Entrepreneur. Equity Analyst. Founder of PentaCode and TradeIV";
export const TWITTER_HANDLE = "@whyzhi";
export const MY_NAME = "Yongzhi Huang";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
