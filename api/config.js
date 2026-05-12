// api/config.js
// Vercel Serverless Function — 安全地把環境變數傳給前端
// 金鑰只存在 Vercel 伺服器，永遠不進 GitHub

export default function handler(req, res) {
  // 只允許 GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 從 Vercel 環境變數讀取金鑰
  const config = {
    mapboxToken: process.env.MAPBOX_TOKEN,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
  };

  // 如果任何金鑰缺失，回傳錯誤
  if (!config.mapboxToken || !config.supabaseUrl || !config.supabaseKey) {
    return res.status(500).json({
      error: '環境變數未設定，請在 Vercel 後台設定 MAPBOX_TOKEN、SUPABASE_URL、SUPABASE_ANON_KEY'
    });
  }

  // 設定 Cache，避免每次都重新 fetch
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json(config);
}
