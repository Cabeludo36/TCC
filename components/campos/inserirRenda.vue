<script setup lang="ts">

const exibirTipos = ref(false);
</script>
<template>
  <div class="w-full bg-slate-300 rounded-md p-2">
    <div class="flex w-full justify-center">
      <h1 v-if="!exibirTipos" class="text-2xl font-medium">Renda</h1>
      <h1 v-if="exibirTipos" class="text-2xl font-medium">Tipos de Renda</h1>
    </div>
    <CamposValoresRenda @abrir-tipos="exibirTipos = true" v-if="!exibirTipos" />
    <LazyCamposTiposRenda @fechar-tipos="exibirTipos = false" v-if="exibirTipos" />
  </div>
</template>
