import { json } from '@sveltejs/kit';
import { login } from '$lib/glpi';

export async function POST({ request, cookies }) {
  const { user, password } = await request.json();

  if (!user || !password) {
    return json({ 
      success: false, 
      error: 'Login e senha obrigatórios' 
    }, { status: 400 });
  }

  const result = await login(user, password);

  if (result.success) {
    // Guarda session token em cookie httpOnly (seguro)
    cookies.set('glpi_session', result.sessionToken, {
      path: '/',
      httpOnly: true,
      secure: false, // mude para true em produção com HTTPS
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return json({ success: true });
  }

  return json({ 
    success: false, 
    error: result.error 
  }, { status: 401 });
}