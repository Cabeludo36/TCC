<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import type { PropType } from "vue";

const props = defineProps({
  dispesasRendaResumo: {
    default: { dispeas: 0, renda: 0, diferenca: 0 },
    type: Object as PropType<{
      dispeas: number;
      renda: number;
      diferenca: number;
    }>,
  },
});

ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale);

const chartOptions = ref({
  responsive: true,
});
const valores = ref<{ dispeas: number; renda: number; diferenca: number }>({
  dispeas: props.dispesasRendaResumo.dispeas,
  renda: props.dispesasRendaResumo.renda,
  diferenca: props.dispesasRendaResumo.diferenca,
});
const chartData = ref({
  labels: ["Renda", "Custos", "Diferença"],
  datasets: [
    {
      label: "Valor",
      backgroundColor: [
        "#5beb34",
        "#f87979",
        valores.value.diferenca > 0.0 ? "#5beb34" : "#f87979",
      ],
      data: [
        valores.value.renda,
        valores.value.dispeas,
        valores.value.diferenca < 0.0
          ? valores.value.diferenca * -1
          : valores.value.diferenca,
      ],
    },
  ],
});

watch(props, () => {
  valores.value = props.dispesasRendaResumo;

  chartData.value = {
  labels: ["Renda", "Custos", "Diferença"],
  datasets: [
    {
      label: "Valor",
      backgroundColor: [
        "#5beb34",
        "#f87979",
        valores.value.diferenca > 0.0 ? "#5beb34" : "#f87979",
      ],
      data: [
        valores.value.renda,
        valores.value.dispeas,
        valores.value.diferenca < 0.0
          ? valores.value.diferenca * -1
          : valores.value.diferenca,
      ],
    },
  ],
}
});
</script>
<template>
  <!--@vue-ignore-->
  <Bar :data="chartData" :options="chartOptions" />
</template>
