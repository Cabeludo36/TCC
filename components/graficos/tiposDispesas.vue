<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { random_hex_color_code } from "~~/utils/hexColorGenerator";
import type { tipoPorcentagemTiposDespesa } from "~/types/states";

ChartJS.register(ArcElement, Tooltip);

const porcentagemTiposDespesa = useState<tipoPorcentagemTiposDespesa[]>(
  "porcentagemTiposDespesa"
);
const chartOptions = ref({
  responsive: true,
});

const chartData = ref();

function setChartData() {
  chartData.value = {
    labels: porcentagemTiposDespesa.value.map((x) => x.tipo),
    datasets: [
      {
        backgroundColor: porcentagemTiposDespesa.value.map(() =>
          random_hex_color_code()
        ),
        data: porcentagemTiposDespesa.value.map((x) => x.per),
      },
    ],
  };
}
setChartData()
watch(porcentagemTiposDespesa, () => {
  setChartData();
});
</script>
<template>
  <!--@vue-ignore-->
  <Doughnut :data="chartData" :options="chartOptions" />
</template>
