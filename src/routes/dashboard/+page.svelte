<script>
  import './page.css';
  import { extractPlainText } from '$lib/utils.js';
  let { data } = $props();

  let selectedTicket = $state(null);

  function openModal(ticket) {
    selectedTicket = ticket;
  }

  function closeModal() {
    selectedTicket = null;
  }

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<svelte:window onkeydown={onKeydown} />

<main class="min-h-screen bg-gray-50 font-inter">

  <!-- ── Header ── -->
  <header class="bg-white border-b border-neutral-200 shadow-sm  top-0 z-10">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-3xl"></span>
        <div>
          <h1 class="font-poppins text-xl font-medium text-gray-900">Dashboard</h1>
          <p class="text-sm text-gray-500">GLPI - Qualidade Funcional</p>
        </div>
      </div>
      <a href="/api/auth/logout" class="text-sm text-gray-600 hover:text-gray-900 transition">
        Sair →
      </a>
    </div>
  </header>

  <!-- ── Content ── -->
  <div class="max-w-7xl mx-auto px-6 py-8">

    {#if data.error}
      <div class="bg-red-100 text-red-700 p-4 rounded-md mb-6 font-medium">
        Erro ao carregar tickets: {data.error}
      </div>
    {/if}

    {#if data.tickets.length === 0 && !data.error}
      <div class="bg-white border border-gray-200 p-12 rounded-xl text-center text-gray-500">
        Nenhum ticket pendente para a Qualidade Funcional no momento.
      </div>
    {:else}
      <!-- Grid de cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {#each data.tickets as ticket}
          <button
            type="button"
            onclick={() => openModal(ticket)}
            class="text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            <!-- Topo do card -->
            <div class="h-1 w-full bg-gray-200"></div>
          
            <div class="p-4 flex flex-col gap-3 flex-1">
              <!-- ID + Status -->
              <div class="flex items-center justify-between">
                <span class="font-poppins text-sm font-semibold text-amber-500 bg-gray-200 px-2.5 py-0.5 rounded-r-xl">
                  #{ticket['2']}
                </span>

              </div>

              <!-- Título -->
              <h2 class="font-poppins text-sm font-semibold text-gray-800 leading-snug">
                {ticket['1']}
              </h2>

              <!-- Descrição truncada -->
              <p class="line-clamp-3 text-xs text-gray-500 leading-relaxed flex-1">
                {extractPlainText(ticket['21']) || 'Sem descrição disponível.'}
              </p>

              <hr class="border-gray-100" />

              <!-- Solicitante / Executor -->
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Solicitante</p>
                  <!-- lógica futura -->
                  <p class="text-xs text-gray-400 italic mt-0.5">— não informado</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Executor</p>
                  <!-- lógica futura -->
                  <p class="text-xs text-gray-400 italic mt-0.5">— não informado</p>
                </div>
              </div>

              <hr class="border-gray-100" />

              <!-- Ambiente + Testador -->
              <div class="flex flex-col gap-1.5">
                <div>
                  <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Ambiente de Homologação</p>
                  <!-- lógica futura -->
                  <p class="text-xs text-gray-400 italic mt-0.5">— não definido</p>
                </div>
                <div>
                  <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Testador</p>
                  <!-- lógica futura -->
                  <p class="text-xs text-gray-400 italic mt-0.5">— não atribuído</p>
                </div>
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>


<!-- ── Modal expandido ── -->
{#if selectedTicket}
  <!-- Backdrop -->
  <div
    class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    onclick={onBackdropClick}
    onkeydown={(e) => e.key === 'Enter' && closeModal()}
    role="dialog"
    aria-modal="true"
    aria-label="Detalhes do ticket"
    tabindex="-1"
  >
    <!-- Painel -->
    <div class="modal-panel bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

      <!-- Barra do topo -->
      <div class="h-1.5 w-full bg-gray-300 flex-shrink-0"></div>

      <!-- Header do modal -->
      <div class="flex items-start justify-between gap-4 px-7 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="font-poppins text-xl font-semibold  text-amber-500 bg-gray-200 rounded-r-xl px-3 py-1 ">
            #{selectedTicket['2']}
          </span>
    
        </div>
        <button
          onclick={closeModal}
          class="text-gray-800 hover:text-amber-500 rounded-full transition text-xl leading-none flex-shrink-0"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>

      <!-- Corpo com scroll -->
      <div class="overflow-y-auto px-7 py-6 flex flex-col gap-6">

        <!-- Título -->
        <div>
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Título</p>
          <h2 class="font-poppins text-lg font-bold text-gray-900 leading-snug">
            {selectedTicket['1']}
          </h2>
        </div>

        <!-- Descrição completa -->
        <div>
          <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Descrição</p>
          <div class="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {extractPlainText(selectedTicket['21']) || 'Sem descrição disponível.'}
          </div>
        </div>

        <!-- Pessoas -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Solicitante</p>
            <!-- lógica futura -->
            <p class="text-sm text-gray-400 italic">— não informado</p>
          </div>
          <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Executor</p>
            <!-- lógica futura -->
            <p class="text-sm text-gray-400 italic">— não informado</p>
          </div>
        </div>

        <!-- QA -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-emerald-50 border border-green-200 rounded-xl p-4">
            <p class="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest mb-1">Ambiente de Homologação</p>
            <!-- lógica futura -->
            <p class="text-sm text-gray-400 italic">— não definido</p>
          </div>
          <div class="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p class="text-[10px] font-semibold text-sky-700 uppercase tracking-widest mb-1">Testador</p>
            <!-- lógica futura -->
            <p class="text-sm text-gray-400 italic">— não atribuído</p>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="px-7 py-4 border-t border-gray-200 flex justify-between flex-shrink-0">
       <button
          onclick={() => window.open(`${env.BASE_URL}front/ticket.form.php?id=${selectedTicket['2']}`, '_blank')}
          class="font-poppins text-lg font-bold bg-amber-500 text-gray-950 px-5 py-2 w-3/6 rounded-lg hover:bg-gray-200 transition-transform hover:scale-105"
        >
          Abrir no GLPI
        </button>
        <button
          onclick={closeModal}
          class="font-poppins text-sm font-thin bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Fechar
        </button>
      </div>

    </div>
  </div>
{/if}