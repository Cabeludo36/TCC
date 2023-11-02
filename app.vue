<script setup lang="ts">
import type { tipoRendaDispesa } from "./types/states";

useHead({
  title: "Bugedt Tracker",
  htmlAttrs: {
    "data-theme": "light",
    lang: "pt-BR",
  },
});
const { data, pending, refresh, execute, error } = await useFetch(
  "/api/buscarPageInfo",
  {
    method: "get",
    immediate: true,
    watch: false,
    lazy: true,
  }
);
pending.value = true;

await execute();
if (error.value) {
}

let pageInfo = data.value as Exclude<typeof data.value, string>;
const tiposRendaDispesa = useState<tipoRendaDispesa[]>("tiposDispesaEntrada");
tiposRendaDispesa.value = [];
const dispesasRendaResumo = ref({ dispeas: 0, renda: 0, diferenca: 0 });
const porcentagem = ref(0);
function setValues() {
  pageInfo = data.value as Exclude<typeof data.value, string>;
  if (pageInfo?.tipos) tiposRendaDispesa.value = pageInfo.tipos;

  if (pageInfo?.dispesasRendaResumo) {
    dispesasRendaResumo.value = {
      dispeas: pageInfo.dispesasRendaResumo.dispeas,
      renda: pageInfo.dispesasRendaResumo.renda,
      diferenca: pageInfo.dispesasRendaResumo.diferenca,
    };
  }

  if (pageInfo?.porcentagemRestante) {
    porcentagem.value = pageInfo?.porcentagemRestante;
  }
}
setValues();

async function refeshDash() {
  refresh();
}
watch(data, () => {
  setValues();
});
</script>
<template>
  <div class="p-2 md:p-8">
    <div class="flex flex-col w-full border-opacity-50">
      <div class="grid card bg-base-300 rounded-box place-items-center md:p-3">
        <div class="flex flex-col md:flex-row w-full">
          <div class="m-1 w-full">
            <CamposInserirRenda @valor-adicionado="refeshDash()" />
          </div>
          <div class="m-1 w-full">
            <CamposInserirDispesa @valor-adicionado="refeshDash()" />
          </div>
        </div>
      </div>
      <div class="divider">Resumo</div>
      <div class="grid card bg-base-300 rounded-box place-items-center">
        <div class="flex flex-row w-full">
          <div class="w-full h-56">
            <div class="flex flex-col w-72 ml-3">
              <h4 class="ml-3 font-medium">Porcentagem da Receita Restante</h4>
              <div class="flex flex-row items-center">
                <progress
                  class="progress progress-success w-full"
                  :value="porcentagem"
                  max="100"
                ></progress>
                <span class="ml-2">{{ porcentagem.toFixed(2) }}</span>
              </div>
            </div>
            <ResumosReceitaDispesas
              :dispesas-renda-resumo="dispesasRendaResumo"
            />
          </div>
        </div>
        <GraficosEntradaSaidas />
        <GraficosTiposDispesas />
        <Geral />
      </div>
    </div>
  </div>
</template>
