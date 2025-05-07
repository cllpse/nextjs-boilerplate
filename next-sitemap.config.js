module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
  generateRobotsTxt: false,
  exclude: [],
  autoLastmod: false,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/cdn-cgi/"],
      },
    ],
  },
}
