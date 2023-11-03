<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  infoTabelaGastosEntradas: {
    default: [],
    type: Object as PropType<
      {
        id_entrada_saida: number;
        data: string;
        valor: number;
        tipo: string;
        style: string;
      }[]
    >,
  },
});

</script>
<template>
  <table class="table table-xs bg-slate-300">
    <thead>
      <tr>
        <th style="width: 5%">ID</th>
        <th style="width: 35%">Tipo</th>
        <th style="width: 15%">Data</th>
        <th style="width: 35%">Quantia</th>
        <th style="width: 5%">Editar</th>
        <th style="width: 10%">Remover</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i of infoTabelaGastosEntradas" :class="i.style">
        <th>{{ i.id_entrada_saida }}</th>
        <td>{{ i.tipo }}</td>
        <td>{{ i.data }}</td>
        <td>R$ {{ i.valor.toFixed(2) }}</td>
        <td>
          <button class="btn btn-info btn-xs">
            <Icon name="material-symbols:edit" />
          </button>
        </td>
        <td>
          <button class="btn btn-error btn-xs">
            <Icon name="octicon:trashcan" />
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
        <tr>
        <td style="width: 5%">ID</td>
        <td style="width: 35%">Tipo</td>
        <td style="width: 15%">Data</td>
        <td style="width: 35%">Quantia</td>
        <td style="width: 5%">Editar</td>
        <td style="width: 10%">Remover</td>
      </tr>
    </tfoot>
  </table>
</template>
