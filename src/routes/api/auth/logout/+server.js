import { redirect } from '@sveltejs/kit';
import { killSession } from '$lib/glpi';
 
export async function GET({ cookies }) {
  const sessionToken = cookies.get('glpi_session');
  
  if (sessionToken) {
    await killSession(sessionToken);
    cookies.delete('glpi_session', { path: '/' });
  }
 
  throw redirect(303, '/');
}
 