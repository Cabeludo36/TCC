<script setup lang="ts">
import type { tipoInfoTabelaGastosEntradas } from "~/types/states";
const emits = defineEmits(["valorEditado"]);

const infoTabelaGastosEntradas = useState<tipoInfoTabelaGastosEntradas[]>(
  "infoTabelaGastosEntradas"
);

const pendingDel = ref(false);
async function deleteValor(id: number) {
  pendingDel.value = true;
  console.log();
  await useFetch(`/api/${id}`, {
    method: "DELETE",
    cache: "no-cache",
    retryStatusCodes: [400, 500],
  })
    .then(() => {
      emits("valorEditado");
    })
    .catch(() => {})
    .finally(() => {
      pendingDel.value = false;
    });
}
</script>
<template>
  <table class="table table-xs bg-slate-300">
    <thead>
      <tr>
        <th style="width: 5%">ID</th>
        <th style="width: 40%">Tipo</th>
        <th style="width: 15%">Data</th>
        <th style="width: 35%">Quantia</th><!-- 
        <th style="width: 5%">Editar</th> -->
        <th style="width: 10%">Remover</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="i of infoTabelaGastosEntradas"
        v-bind:class="{
          'bg-green-300': i.ehParaEntrada,
          'bg-red-300': !i.ehParaEntrada,
        }"
      >
        <th>{{ i.id_entrada_saida }}</th>
        <td>{{ i.tipo }}</td>
        <td>{{ i.data }}</td>
        <td>R$ {{ i.valor.toFixed(2) }}</td><!-- 
        <td>
          <button :disabled="pendingDel" class="btn btn-info btn-xs">
            <Icon name="material-symbols:edit" />
          </button>
        </td> -->
        <td>
          <button
            :disabled="pendingDel"
            @click="deleteValor(i.id_entrada_saida)"
            class="btn btn-error btn-xs"
          >
            <Icon name="octicon:trashcan" />
          </button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td style="width: 5%">ID</td>
        <td style="width: 40%">Tipo</td>
        <td style="width: 15%">Data</td>
        <td style="width: 35%">Quantia</td><!-- 
        <td style="width: 5%">Editar</td> -->
        <td style="width: 10%">Remover</td>
      </tr>
    </tfoot>
  </table>
</template>
