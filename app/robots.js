export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenfuturetech.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/superadmin",
          "/superadmin/*",
          "/admin",
          "/admin/*",
          "/dashboard",
          "/dashboard/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
