<script>
  import { goto } from '$app/navigation';
  
  let login = $state('');
  let password = $state('');
  let loading = $state(false);
  let errorMsg = $state('');

  async function logar() {
    errorMsg = '';
    loading = true;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
      });

      const data = await res.json();

      if (data.success) {
        goto('/dashboard'); // redireciona pro dashboard
      } else {
        errorMsg = data.error || 'Falha no login';
      }
    } catch (err) {
      errorMsg = 'Erro de conexão. Verifique o servidor.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Dashboard QA</title>
</svelte:head>

<main class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4 font-inter">
  <div class="w-full max-w-md">
    
    <!-- Card Login -->
    <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="text-5xl mb-3">🎯</div>
        <h1 class="font-poppins text-2xl font-bold text-gray-900">
          Dashboard QA
        </h1>
        <p class="text-gray-500 text-sm mt-2">
          Faça login com suas credenciais GLPI
        </p>
      </div>

      <!-- Form -->
      <form onsubmit={(e) => { e.preventDefault(); logar(); }} class="space-y-5">
        
        <!-- Login -->
        <div>
          <label for="login" class="block text-sm font-medium text-gray-700 mb-1.5">
            Usuário
          </label>
          <input
            id="login"
            type="text"
            bind:value={login}
            disabled={loading}
            placeholder="seu.usuario"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            required
          />
        </div>

        <!-- Senha -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1.5">
            Senha
          </label>
          <input
            id="password"
            type="password"
            bind:value={password}
            disabled={loading}
            placeholder="••••••••"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
            required
          />
        </div>

        <!-- Erro -->
        {#if errorMsg}
          <div class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <span class="text-red-500 text-lg">⚠️</span>
            <p class="text-sm text-red-700 flex-1">{errorMsg}</p>
          </div>
        {/if}

        <!-- Botão -->
        <button
          type="submit"
          disabled={loading}
          class="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {#if loading}
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Entrando...
          {:else}
            Entrar
          {/if}
        </button>

      </form>

      <!-- Footer -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>Suas credenciais são enviadas diretamente para o servidor GLPI</p>
      </div>

    </div>

  </div>
</main>

<style>
  :global(.font-poppins) { font-family: 'Poppins', sans-serif; }
  :global(.font-inter) { font-family: 'Inter', sans-serif; }
</style>