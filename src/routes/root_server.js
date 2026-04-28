import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  const sessionToken = cookies.get('glpi_session');

  // Se já tem session, vai direto pro dashboard
  if (sessionToken) {
    throw redirect(303, '/dashboard');
  }

  return {
    authenticated: false
  };
}