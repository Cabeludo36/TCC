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
import type { tipoDispesasRendaResumo } from "~/types/states";

const dispesasRendaResumo =
  useState<tipoDispesasRendaResumo>("dispesasRendaResumo");
ChartJS.register(Tooltip, BarElement, CategoryScale, LinearScale);

const chartOptions = ref({
  responsive: true,
});

const chartData = ref();
function setCartData() {
  chartData.value = {
    labels: ["Renda", "Custos", "Diferença"],
    datasets: [
      {
        label: "Valor",
        backgroundColor: [
          "#5beb34",
          "#f87979",
          dispesasRendaResumo.value.diferenca > 0.0 ? "#5beb34" : "#f87979",
        ],
        data: [
          dispesasRendaResumo.value.renda,
          dispesasRendaResumo.value.dispeas,
          dispesasRendaResumo.value.diferenca < 0.0
            ? dispesasRendaResumo.value.diferenca * -1
            : dispesasRendaResumo.value.diferenca,
        ],
      },
    ],
  };
}
setCartData();
watch(dispesasRendaResumo, () => {
  setCartData();
});
</script>
<template>
  <!--@vue-ignore-->
  <Bar :data="chartData" :options="chartOptions" />
</template>
