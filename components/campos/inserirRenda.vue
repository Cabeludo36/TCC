<script setup lang="ts">
//#region quantia
const quantia = ref(0);
//#endregion
</script>
<template>
  <div class="w-full bg-slate-300 rounded-md p-2">
    <div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Quantia</span>
        </label>
        <SharedCurrencyInput
          v-model="quantia"
          class="input input-bordered w-full max-w-xs bg-slate-200"
          placeholder="R$ 123,00"
        />

        <label class="label">
          <span class="label-text-alt">Bottom Left label</span>
        </label>
      </div>
    </div>
  </div>
</template>
