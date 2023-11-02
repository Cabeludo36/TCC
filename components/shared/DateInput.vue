<script setup lang="ts">
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: String,
});
const data = ref(props.modelValue ? props.modelValue : "");

function formatData() {
  const input = data.value.replace(/\D/g, ""); // Remove non-numeric characters
  let formatted = "";

  for (let i = 0; i < input.length; i++) {
    if (i === 2 || i === 4) {
      formatted += "/" + input[i];
    } else {
      formatted += input[i];
    }
  }

  data.value = formatted.slice(0, 10); // Ensure the length does not exceed MM/DD/YYYY
  emits("update:modelValue", data.value);
}
</script>
<template>
  <!--@vue-ignore-->
  <input
    type="text"
    v-model="data"
    :class="$attrs.class"
    :placeholder="$attrs.placeholder"
    @input="formatData()"
  />
</template>
