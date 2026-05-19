<script>
  import { goto } from '$app/navigation';

  let user = $state('');
  let password = $state('');
  let loading = $state(false);
  let errorMsg = $state('');
  let showPassword = $state(false);

  async function logar() {
    errorMsg = '';
    loading = true;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
      });

      const data = await res.json();

      if (data.success) {
        goto('/dashboard');
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
  <title>Login • Tickets GLPI</title>
</svelte:head>

<main class="min-h-screen overflow-hidden bg-[#0b1020] text-white relative font-inter">
  <!-- Background Effects -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-[-120px] left-[-100px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
    <div class="absolute bottom-[-120px] right-[-100px] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]"></div>
  </div>

  <section class="relative z-10 grid min-h-screen lg:grid-cols-2">
    <!-- Left Side -->
    <div class="hidden lg:flex flex-col justify-between p-14 border-r border-white/10 backdrop-blur-sm">
      <div>
        <div class="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-xl shadow-lg shadow-indigo-500/30">
            🎫
          </div>

          <div>
            <h1 class="font-poppins text-lg font-semibold tracking-wide">
              Qualidade Funcional - GLPI
            </h1>
          </div>
        </div>

        <div class="mt-20 max-w-lg">
          <span class="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
            Plataforma interna
          </span>

          <h2 class="mt-6 font-poppins text-5xl font-bold leading-tight">
            Visualizador de tarefas
          </h2>

          <p class="mt-1 text-lg leading-8 text-white/70">
            Acesse sua central GLPI com uma experiência moderna, limpa e otimizada para produtividade.
          </p>
        </div>
      </div>
  
      <div class="grid grid-cols-3 gap-4">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p class="text-2xl font-bold">24/7</p>
          <span class="text-sm text-white/60">Monitoramento</span>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p class="text-2xl font-bold">+1k</p>
          <span class="text-sm text-white/60">Tickets ativos</span>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
          <p class="text-2xl font-bold">100%</p>
          <span class="text-sm text-white/60">Seguro</span>
        </div>
      </div>
    </div>

    

    <!-- Right Side -->
    <div class="flex items-center justify-center p-6 lg:p-10">
      <div class="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl">
        <!-- Mobile Logo -->
        <div class="mb-8 flex items-center gap-3 lg:hidden">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-xl shadow-lg shadow-indigo-500/30">
            🎫
          </div>

          <div>
            <h1 class="font-poppins text-lg font-semibold">
              Tarefas GLPI
            </h1>
          </div>
        </div>

        <!-- Header -->
        <div>
          <h2 class="font-poppins text-3xl font-bold text-white">
            Bem-vindo!
          </h2>

          <p class="mt-2 text-sm leading-6 text-white/60">
            Faça login usando as credenciais do GLPI para acessar as tarefas.
          </p>
        </div>

        <!-- Form -->
        <form
          onsubmit={(e) => {
            e.preventDefault();
            logar();
          }}
          class="mt-8 space-y-5"
        >
          <!-- User -->
          <div>
            <label
              for="login"
              class="mb-2 block text-sm font-medium text-white/70"
            >
              Usuário
            </label>

            <div class="group flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-indigo-400 focus-within:bg-white/10">
              <span class="text-lg text-white/40">👤</span>

              <input
                id="login"
                type="text"
                bind:value={user}
                disabled={loading}
                placeholder="seu.usuario"
                class="w-full bg-transparent px-3 py-4 text-white placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-white/70"
            >
              Senha
            </label>

            <div class="group flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 transition focus-within:border-indigo-400 focus-within:bg-white/10">
              <span class="text-lg text-white/40">🔒</span>

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                bind:value={password}
                disabled={loading}
                placeholder="••••••••"
                class="w-full bg-transparent px-3 py-4 text-white placeholder:text-white/30 focus:outline-none disabled:cursor-not-allowed"
                required
              />

              <button
                type="button"
                class="text-sm text-white/50 transition hover:text-white"
                onclick={() => (showPassword = !showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <!-- Error -->
          {#if errorMsg}
            <div class="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100 backdrop-blur-sm">
              <span>⚠️</span>
              <p>{errorMsg}</p>
            </div>
          {/if}

          <!-- Submit -->
          <button
            type="submit"
            disabled={loading}
            class="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 font-semibold text-white shadow-xl shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {#if loading}
              <svg
                class="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              Entrando...
            {:else}
              Acessar 
            {/if}
          </button>
        </form>

      </div>
    </div>
  </section>
</main>

<style>
  :global(.font-poppins) {
    font-family: 'Poppins', sans-serif;
  }

  :global(.font-inter) {
    font-family: 'Inter', sans-serif;
  }
</style>
```

