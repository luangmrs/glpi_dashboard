import { GLPI_URL } from '$env/static/private';
import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
    headers,
    
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
export async function login(user, password) {
  const authHeader = `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
  
  try {
    const data = await glpiFetch('/initSession', {
      method: 'POST',
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
export async function pesquisarTicketsFiltro(sessionToken) {
  
  const params = new URLSearchParams({
    // status do ticket
    'criteria[0][field]': '12',
    'criteria[0][searchtype]': 'equals',
    'criteria[0][value]': 'notold',
    
    // status da tarefa
    'criteria[1][link]': 'AND',
    'criteria[1][field]': '33',
    'criteria[1][searchtype]': 'equals',
    'criteria[1][value]': '1',
    
    // grupo atribuído
    'criteria[2][link]': 'AND',
    'criteria[2][field]': '112',
    'criteria[2][searchtype]': 'contains',
    'criteria[2][value]': 'qualidade funcional'
  });

  try {
    const data = await glpiFetch(`/search/Ticket?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Session-Token': sessionToken
      }
    });
    
    // O /search retorna os resultados dentro de um array chamado "data"
    return { success: true, tickets: data.data || [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}