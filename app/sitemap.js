export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenfuturetech.com";
  const currentDate = new Date().toISOString();

  const routes = [
    { url: "", changeFrequency: "daily", priority: 1.0 },
    { url: "/about", changeFrequency: "weekly", priority: 0.9 },
    { url: "/vision-mission", changeFrequency: "monthly", priority: 0.8 },
    { url: "/packages", changeFrequency: "daily", priority: 0.95 },
    { url: "/packages/student", changeFrequency: "weekly", priority: 0.85 },
    { url: "/packages/personal", changeFrequency: "weekly", priority: 0.85 },
    { url: "/packages/business", changeFrequency: "weekly", priority: 0.85 },
    { url: "/gft-token", changeFrequency: "daily", priority: 0.95 },
    { url: "/income-calculator", changeFrequency: "weekly", priority: 0.9 },
    { url: "/refer-earn", changeFrequency: "weekly", priority: 0.85 },
    { url: "/ranks-rewards", changeFrequency: "weekly", priority: 0.85 },
    { url: "/rewards", changeFrequency: "weekly", priority: 0.8 },
    { url: "/business-plan", changeFrequency: "monthly", priority: 0.8 },
    { url: "/team-growth", changeFrequency: "weekly", priority: 0.75 },
    { url: "/achievements", changeFrequency: "monthly", priority: 0.75 },
    { url: "/offers", changeFrequency: "daily", priority: 0.85 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { url: "/payment-policy", changeFrequency: "yearly", priority: 0.5 },
    { url: "/register", changeFrequency: "monthly", priority: 0.7 },
    { url: "/login", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
