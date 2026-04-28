import { redirect } from '@sveltejs/kit';
 
export async function load({ cookies }) {
  const sessionToken = cookies.get('glpi_session');
 
  // Se não tem session, redireciona pro login
  if (!sessionToken) {
    throw redirect(303, '/');
  }
 
  // Poderia validar token aqui fazendo request pro GLPI
  // Por ora só passa token pra frente
  return {
    authenticated: true,
    sessionToken // frontend não vê isso diretamente (httpOnly)
  };
}