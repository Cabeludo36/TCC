<script setup lang="ts">
import type {
  tipoDispesasRendaResumo,
  tipoInfoTabelaGastosEntradas,
  tipoPorcentagemTiposDespesa,
  tipoRendaDispesa,
} from "./types/states";

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
const tiposRendaDispesa = useState<tipoRendaDispesa[]>("tiposRendaDispesa");
const dispesasRendaResumo = useState<tipoDispesasRendaResumo>(
  "dispesasRendaResumo"
);
const porcentagem = useState<number>("porcentagem");
const porcentagemTiposDespesa = useState<tipoPorcentagemTiposDespesa[]>(
  "porcentagemTiposDespesa"
);
const infoTabelaGastosEntradas = useState<tipoInfoTabelaGastosEntradas[]>(
  "infoTabelaGastosEntradas"
);

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

  if (pageInfo?.porcentagemGastos) {
    porcentagemTiposDespesa.value = pageInfo.porcentagemGastos;
  }

  if (pageInfo?.infoTabelaGastosEntradas) {
    infoTabelaGastosEntradas.value = pageInfo.infoTabelaGastosEntradas;
  }
}
setValues();

function refeshDash() {
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
        <div class="collapse bg-base-200">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            Clique para editar os valores
          </div>
          <div class="collapse-content">
            <div class="flex flex-col md:flex-row w-full">
              <div class="m-1 w-full">
                <CamposInserirRenda @valor-adicionado="refeshDash()" />
              </div>
              <div class="m-1 w-full">
                <CamposInserirDispesa @valor-adicionado="refeshDash()" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider">Resumo</div>
      <div class="grid card bg-base-300 rounded-box place-items-center p-6">
        <div
          class="flex flex-col justify-between md:flex-row md:w-40 lg:w-full"
        >
          <div class="w-full md:w-80">
            <div class="flex flex-col w-full ml-3">
              <h4 class="ml-3 font-medium">Porcentagem da Receita Restante</h4>
              <div class="flex flex-row items-center">
                <progress
                  class="progress progress-success w-full"
                  :value="porcentagem"
                  max="100"
                ></progress>
                <span class="ml-2">{{ porcentagem.toFixed(2) }}%</span>
              </div>
            </div>
            <ResumosReceitaDispesas />
          </div>
          <div class="flex flex-col w-full md:w-60 m-4 items-center">
            <Geral />
          </div>
          <div class="flex flex-col w-full md:w-60 m-4 items-center">
            <GraficosTiposDispesas />
          </div>
        </div>
        <div class="flex flex-col w-full max-h-44 m-4 justify-between">
          <div class="w-full md:w-1/2 overflow-x-auto">
            <GraficosEntradaSaidas @valor-editado="refeshDash()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
