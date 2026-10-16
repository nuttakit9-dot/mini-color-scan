// Cloudflare Worker (ไม่บังคับ): ตัวกลางเรียก Claude API สำหรับแท็บ "แนะนำสี"
// ตั้งค่า Secret: ANTHROPIC_API_KEY  และตัวแปร: ALLOWED_ORIGIN (เช่น https://your-app.pages.dev), MODEL (ไม่บังคับ)
export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const ok = !!env.ALLOWED_ORIGIN && origin === env.ALLOWED_ORIGIN;
    const cors = {
      "Access-Control-Allow-Origin": ok ? origin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST" || !ok) return new Response("forbidden", { status: 403, headers: cors });

    const fd = await req.formData();
    const img = fd.get("image");
    const prompt = String(fd.get("prompt") || "").slice(0, 4000);
    if (!img || typeof img === "string" || img.size > 4_000_000)
      return new Response("bad image", { status: 400, headers: cors });

    const bytes = new Uint8Array(await img.arrayBuffer());
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.MODEL || "claude-sonnet-5-5",
        max_tokens: 1800,
        messages: [{ role: "user", content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: btoa(bin) } },
          { type: "text", text: prompt },
        ] }],
      }),
    });
    if (!r.ok) return new Response("upstream error", { status: r.status === 429 ? 429 : 502, headers: cors });
    const data = await r.json();
    const text = (data.content || []).map(c => c.text || "").join("");
    const a = text.indexOf("{"), b = text.lastIndexOf("}");
    if (a < 0 || b < a) return new Response("bad reply", { status: 502, headers: cors });
    return new Response(text.slice(a, b + 1), { headers: { ...cors, "content-type": "application/json" } });
  },
};
