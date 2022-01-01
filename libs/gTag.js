export const pageview = (url) => {
  window.gtag("config", "G-LQHP0K5JZH", {
    page_path: url,
  });
};
