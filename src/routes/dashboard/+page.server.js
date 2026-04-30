import { pesquisarTicketsFiltro } from '$lib/glpi';
export async function load({ cookies }) {
  const sessionToken = cookies.get('glpi_session');
  
  const response = await pesquisarTicketsFiltro(sessionToken);


  return {
    authenticated: true,
    tickets: response.success ? response.tickets : [],
    error: response.error || null
    // pode adicionar dados aqui tipo tickets
  };
}