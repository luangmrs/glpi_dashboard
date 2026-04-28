import { GLPI_URL } from '$env/static/private';

/**
 * Fetch com glpi
 */
async function glpiFetch(endpoint, options = {}) {
  const url = `${GLPI_URL}/apirest.php${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    throw new Error('Erro de autenticação: Session expirada ou credenciais inválidas.');
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData[0] || errorData[1] || `Erro HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Login com credenciais do usuário
 */
export async function login(login, password) {
  const authHeader = `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;

  try {
    const data = await glpiFetch('/initSession', {
      method: 'GET',
      headers: {
        'Authorization': authHeader
      }
    });
    
    return { 
      success: true, 
      sessionToken: data.session_token 
    };
  } catch (error) {
    console.error('Falha autenticação:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

/**
 * Logout
 */
export async function killSession(sessionToken) {
  if (!sessionToken) return;
  
  try {
    await glpiFetch('/killSession', { 
      method: 'DELETE',
      headers: {
        'Session-Token': sessionToken
      }
    });
  } catch (error) {
    console.error('Erro logout:', error);
  }
}

/**
 * Buscar tickets (exemplo uso session)
 */
export async function getTickets(sessionToken, range = '0-50') {
  try {
    const data = await glpiFetch('/Ticket', {
      method: 'GET',
      headers: {
        'Session-Token': sessionToken,
        'Range': range
      }
    });
    return { success: true, tickets: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}