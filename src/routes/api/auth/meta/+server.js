import { json } from '@sveltejs/kit';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
 
const META_PATH = join(process.cwd(), 'data', 'ticket-meta.json');
 
function readMeta() {
  if (!existsSync(META_PATH)) return {};
  try { return JSON.parse(readFileSync(META_PATH, 'utf-8')); }
  catch { return {}; }
}
 
function writeMeta(meta) {
  mkdirSync(join(process.cwd(), 'data'), { recursive: true });
  writeFileSync(META_PATH, JSON.stringify(meta, null, 2), 'utf-8');
}
 
export function GET() {
  return json(readMeta());
}
 
export async function POST({ request }) {
  const { ticketId, field, value } = await request.json();
  const meta = readMeta();
  meta[ticketId] = { ...meta[ticketId], [field]: value };
  writeMeta(meta);
  return json({ ok: true });
}