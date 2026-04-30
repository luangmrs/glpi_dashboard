<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>Dashboard - QA GLPI</title>
</svelte:head>

<main class="min-h-screen bg-gray-50 font-inter">
  
  <!-- Header -->
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-3xl">🎯</span>
        <div>
          <h1 class="font-poppins text-xl font-bold text-gray-900">Dashboard QA</h1>
          <p class="text-xs text-gray-500">Sistema GLPI</p>
        </div>
      </div>
      
      <a 
        href="/api/auth/logout" 
        class="text-sm text-gray-600 hover:text-gray-900 transition"
      >
        Sair →
      </a>
    </div>
  </header>

  <!-- Content -->
  <div class="max-w-7xl mx-auto px-6 py-8">
    
    <!-- Status -->
    <section class="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
      <div class="flex items-center gap-4">
        <div class="text-4xl">✅</div>
        <div>
          <h2 class="font-poppins text-lg font-semibold text-gray-900">
            Conectado com Sucesso!
          </h2>
          <p class="text-sm text-gray-600 mt-1">
            Sessão ativa no GLPI. Você está autenticado.
          </p>
        </div>
      </div>
    </section>

    <!-- Próximos Passos -->
    <section class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h2 class="font-poppins text-lg font-semibold mb-4 text-gray-800">
        Próximos Passos
        <br>
      </h2>
      <ul class="space-y-3">
        <li class="flex items-center gap-2 text-gray-600">
          <span class="text-green-500">✓</span> Setup + Tailwind
        </li>
        <li class="flex items-center gap-2 text-gray-600">
          <span class="text-green-500">✓</span> Proxy Server
        </li>
        <li class="flex items-center gap-2 text-gray-600">
          <span class="text-green-500">✓</span> Sistema de Login
        </li>
        <li class="flex items-center gap-2 font-bold text-indigo-700">
          <span class="text-blue-500">→</span> Listar Tickets (próximo)
        </li>
        <li class="flex items-center gap-2 text-gray-400">
          <span class="text-gray-300">○</span> Filtros e UI Avançada
        </li>
      </ul>
    </section>

  </div>

</main>

<style>
  :global(.font-poppins) { font-family: 'Poppins', sans-serif; }
  :global(.font-inter) { font-family: 'Inter', sans-serif; }
</style>