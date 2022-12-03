module.exports = {
  siteUrl: "https://joonlog.vercel.app/",
  generateRobotsTxt: true, // default: false, true 라고 설정해야 robots.txt 생성
  sitemapSize: 7000,
  exclude: ["/posts/write", "/login", "/posts/*/edit"],
};
