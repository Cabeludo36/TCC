<template>
  <!--@vue-ignore-->
  <input
    :class="$attrs.class"
    :placeholder="$attrs.placeholder"
    ref="inputRef"
    type="text"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import {
  useCurrencyInput,
  type CurrencyInputOptions,
} from "vue-currency-input";
const props = defineProps({
  modelValue: Number,
  options: Object as PropType<CurrencyInputOptions>,
});
const defOptions: CurrencyInputOptions = {
  locale: "pt-BR",
  currency: "BRL",
  precision: 2,
  hideCurrencySymbolOnFocus: true,
  hideGroupingSeparatorOnFocus: true,
  hideNegligibleDecimalDigitsOnFocus: true,
  autoDecimalDigits: false,
  useGrouping: false,
  accountingSign: false,
};
const { inputRef } = useCurrencyInput(
  props.options ? props.options : defOptions
);
</script>
