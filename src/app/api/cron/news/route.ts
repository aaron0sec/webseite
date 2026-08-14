import { revalidatePath } from "next/cache";
import { getCyberNews } from "@/lib/cyber-news";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET is not configured.");
    return Response.json({ ok: false, message: "Cron endpoint is not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");
  if (authorization !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const items = await getCyberNews(30, true);
  const refreshedAt = new Date().toISOString();

  revalidatePath("/news/rss.xml");
  revalidatePath("/news");

  return Response.json({
    ok: true,
    refreshed: items.length,
    refreshedAt,
    nextExpectedRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
}
