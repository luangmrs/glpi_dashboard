// Hooks já redireciona se não tem session
// Aqui só carrega dados
export async function load({ cookies }) {
  const sessionToken = cookies.get('glpi_session');
  
  return {
    authenticated: true,
    // pode adicionar dados aqui tipo tickets
  };
}