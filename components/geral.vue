<script setup lang="ts">
const props = defineProps({
    dispesasRendaResumo: {
    default: { dispeas: 0, renda: 0, diferenca: 0 },
    type: Object as PropType<{
      dispeas: number;
      renda: number;
      diferenca: number;
    }>,
  },
})
</script>
<template>
<div class="flex flex-col w-full justify-center">
    <div class="flex flex-col items-center mr-3 ml-3 text-lg">
        <span class="font-semibold">R$ {{ dispesasRendaResumo.renda.toFixed(2) }}</span>
        <h4 class="text-blue-500 font-semibold">TOTAL RENDA MENSAL</h4>
    </div>
    <div class="flex flex-col items-center mr-3 ml-3 text-base">
        <span class="font-semibold">R$ {{ dispesasRendaResumo.dispeas.toFixed(2) }}</span>
        <h4 class="text-blue-500 font-semibold">TOTAL DESPESA MENSAL</h4>
    </div>
    <div class="flex flex-col items-center mr-3 ml-3 text-lg">
        <span class="font-semibold">R$ {{ dispesasRendaResumo.diferenca.toFixed(2) }}</span>
        <h4 class="text-blue-500 font-semibold">TOTAL SALDO CAIXA</h4>
    </div>
</div>
</template>