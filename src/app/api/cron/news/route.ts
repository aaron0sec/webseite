import { getCyberNews } from "@/lib/cyber-news";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const items = await getCyberNews(30);
  return Response.json({ ok: true, refreshed: items.length, at: new Date().toISOString() });
}
