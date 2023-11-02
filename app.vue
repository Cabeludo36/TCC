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
await execute()
if (error.value) {
}

const pageInfo = data.value as Exclude<typeof data.value, string>;
const tiposRendaDispesa = useState<tipoRendaDispesa[]>("tiposDispesaEntrada");

tiposRendaDispesa.value = []

if(pageInfo?.tipos)
  tiposRendaDispesa.value = pageInfo.tipos;
</script>
<template>
  <div class="p-2 md:p-8">
    <div class="flex flex-col w-full border-opacity-50">
      <div class="grid card bg-base-300 rounded-box place-items-center md:p-3">
        <div class="flex flex-col md:flex-row w-full">
          <div class="m-1 w-full">
            <CamposInserirRenda />
          </div>
          <div class="m-1 w-full">
            <CamposInserirDispesa />
          </div>
        </div>
      </div>
      <div class="divider">Resumo</div>
      <div class="grid card bg-base-300 rounded-box place-items-center">
        <GraficosEntradaSaidas />
        <GraficosTiposDispesas />
        <ResumosReceitaDispesas />
        <Geral />
      </div>
    </div>
  </div>
</template>
