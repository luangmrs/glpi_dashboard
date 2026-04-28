import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const sessionToken = event.cookies.get('glpi_session');
  
  // Debug
  console.log('🔍 Path:', event.url.pathname);
  console.log('🍪 Cookie glpi_session:', sessionToken ? 'EXISTS' : 'MISSING');

  // Proteção global: se tenta acessar /dashboard sem login
  if (event.url.pathname.startsWith('/dashboard')) {
    if (!sessionToken) {
      console.log('⛔ Sem session - redirecionando pra /');
      throw redirect(303, '/');
    }
  }

  // Se tenta acessar / ou /login tendo session
  if (event.url.pathname === '/' && sessionToken) {
    console.log('✅ Tem session - redirecionando pra /dashboard');
    throw redirect(303, '/dashboard');
  }

  return resolve(event);
}