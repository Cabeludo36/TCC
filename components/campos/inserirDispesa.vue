<script setup lang="ts">
defineEmits(['valorAdicionado'])
const exibirTipos = ref(false);
</script>
<template>
  <div class="w-full bg-slate-300 rounded-md p-2">
    <div class="flex w-full justify-center">
      <h1 v-if="!exibirTipos" class="text-2xl font-medium">Custos</h1>
      <h1 v-if="exibirTipos" class="text-2xl font-medium">Tipos de Custo</h1>
    </div>
    <CamposValoresDispesa @valor-adicionado="$emit('valorAdicionado')" @abrir-tipos="exibirTipos = true" v-if="!exibirTipos" />
    <LazyCamposTiposDispesa @fechar-tipos="exibirTipos = false" v-if="exibirTipos" />
  </div>
</template>
