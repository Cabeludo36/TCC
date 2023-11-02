<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import type { PropType } from "vue";
import { random_hex_color_code } from "~~/utils/hexColorGenerator";
const props = defineProps({
  dispesasResumo: {
    default: [],
    type: Object as PropType<
      {
        soma: number;
        tipo: string;
        per: number;
      }[]
    >,
  },
});

ChartJS.register(ArcElement, Tooltip);

const chartOptions = ref({
  responsive: true,
  legends: {
    position: 'bottom'
  }
});
const valores = ref<{ per: number; soma: number; tipo: string }[]>(
  props.dispesasResumo
);

const chartData = ref({
  labels: valores.value.map((x) => x.tipo),
  datasets: [
    {
      backgroundColor: valores.value.map(() => random_hex_color_code()),
      data: valores.value.map((x) => x.per),
    },
  ],
});

watch(props, () => {
  valores.value = props.dispesasResumo;

  chartData.value = {
    labels: valores.value.map((x) => x.tipo),
    datasets: [
      {
        backgroundColor: valores.value.map(() => random_hex_color_code()),
        data: valores.value.map((x) => x.per),
      },
    ],
  };
});
</script>
<template>
  <!--@vue-ignore-->
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
