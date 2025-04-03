export default async function handler(req, res) {
    const siteUrl = "https://lovefools.in";
  
    // ⚡ Fetch your dynamic URLs (replace with your API or database call)
    const dynamicUrls = [
      "/booking",
    //   "/contact",
    //   "/blog/post-1",
    //   "/blog/post-2",
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${dynamicUrls
        .map(
          (url) => `
        <url>
          <loc>${siteUrl}${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`
        )
        .join("")}
    </urlset>`;
  
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(sitemap);
  }