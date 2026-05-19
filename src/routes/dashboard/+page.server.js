import { pesquisarTicketsFiltro } from '$lib/glpi';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const META_PATH = join(process.cwd(), 'data', 'ticket-meta.json');

function readMeta() {
  if (!existsSync(META_PATH)) return {};
  try { return JSON.parse(readFileSync(META_PATH, 'utf-8')); }
  catch { return {}; }
}

export async function load({ cookies }) {
  const sessionToken = cookies.get('glpi_session');
  const response = await pesquisarTicketsFiltro(sessionToken);

  return {
    authenticated: true,
    tickets: response.success ? response.tickets : [],
    error: response.error || null,
    ticketMeta: readMeta()
  };
}