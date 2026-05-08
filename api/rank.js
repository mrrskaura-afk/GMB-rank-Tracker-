export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { keyword, lat, lng } = req.query;

  if (!keyword || !lat || !lng) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const url = `https://serpapi.com/search?engine=google_maps&q=${encodeURIComponent(keyword)}&ll=@${lat},${lng},14z&api_key=ebe0eee5009ea8cd26d536508481fad44123c8ebb25d8b24c8e8ee2810c8239d`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
