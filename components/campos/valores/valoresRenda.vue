<script setup lang="ts">
import moment from "moment";
import type { tipoRendaDispesa } from "~/types/states";

defineEmits(["abrirTipos"]);

const tiposRenda = useState<tipoRendaDispesa[]>(
  "tiposDispesaEntrada"
).value?.filter((x) => x.ehEntrada === true);

//#region quantia
const quantiaError = ref("");
const quantia = ref(0);
function verificaQuantia() {
  quantiaError.value = "";
  if (quantia.value === 0 || quantia.value < 0) {
    quantiaError.value = "A quantia não pode ser menor/igual a zero";
    return false;
  }
  return true;
}
//#endregion

//#region tipo renda
const tipoRendaError = ref("");
const tipoRenda = ref(0);
function verificaTipoRenda() {
  tipoRendaError.value = "";
  if (tipoRenda.value < 1) {
    tipoRendaError.value = "Selecione um tipo de renda";
    return false;
  }
  return true;
}
//#endregion

//#region data
const dataError = ref("");
const data = ref("");
function verificaData() {
  dataError.value = "";
  const dataF = data.value.trim();
  if (dataF.length < 1) {
    dataError.value = "Preencher Data";
    return false;
  }
  if (dataF.length < 10) {
    dataError.value = "Data invalida";
    return false;
  }
  let newData;
  try {
    newData = moment(dataF);
  } catch (error) {
    dataError.value = "Data invalida";
    return false;
  }

  if (!newData.isValid()) {
    dataError.value = "Data invalida";
    return false;
  }

  if (newData.year() < 1900) {
    dataError.value = "Data invalida";
    return false;
  }

  return true;
}
//#endregion

//#region form
const formError = ref("");

const {
  data: resposta,
  error,
  pending,
  execute,
  refresh,
} = useFetch("/api/salvarValor", {
  method: "POST",
  body: {
    quantia: quantia,
    tipo: tipoRenda,
    quando: data,
  },
  immediate: false,
  watch: false,
  lazy: false,
});
pending.value = false;

function verificaForm() {
  const validacoes = [verificaQuantia(), verificaData(), verificaTipoRenda()];

  return validacoes.includes(false);
}

async function salvar() {
  formError.value = "";
  if (verificaForm()) {
    return;
  }
  await execute();

  if (error.value) {
    if (typeof error.value.data == "string") {
      formError.value = error.value.data;
      return;
    }
    formError.value = "Um erro inesperado ocorreu";
    return;
  }

  const retorno = resposta.value as Exclude<typeof data.value, string>;
  console.log(retorno);
}

//#endregion
</script>
<template>
  <div class="w-full flex flex-col md:flex-row">
    <div class="form-control w-full md:m-1">
      <label class="label">
        <span class="label-text">Quantia</span>
      </label>
      <SharedCurrencyInput
        v-model="quantia"
        class="input input-bordered w-full bg-slate-200"
        v-bind:class="{ 'input-error': quantiaError != '' }"
        placeholder="R$ 123,00"
      />
      <label v-if="quantiaError != ''" class="label">
        <span class="label-text-alt text-red-600">{{ quantiaError }}</span>
      </label>
    </div>
    <div class="form-control w-full md:m-1">
      <label class="label">
        <span class="label-text">Tipo de Renda</span>
      </label>
      <select
        v-model="tipoRenda"
        class="select select-bordered bg-slate-200"
        v-bind:class="{ 'select-error': tipoRendaError != '' }"
      >
        <option :value="0" disabled selected>Escolha</option>
        <option v-for="i of tiposRenda" :key="i.id" :value="i.id">
          {{ i.nome }}
        </option>
      </select>
      <label v-if="tipoRendaError != ''" class="label">
        <span class="label-text-alt text-red-600">{{ tipoRendaError }}</span>
      </label>
    </div>
  </div>
  <div class="w-full flex flex-col md:flex-row">
    <div class="form-control w-full md:max-w-fit">
      <label class="label">
        <span class="label-text">Quando</span>
      </label>
      <SharedDateInput
        v-model:model-value="data"
        class="input input-bordered w-full bg-slate-200 md:max-w-xs"
        placeholder="DD/MM/AAAA"
      />
      <label v-if="dataError != ''" class="label">
        <span class="label-text-alt text-red-600">{{ dataError }}</span>
      </label>
    </div>
  </div>
  <div v-if="formError != ''" class="alert alert-error">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{{ formError }}</span>
  </div>
  <div class="w-full flex flex-col md:flex-row md:justify-between mt-1">
    <button @click="$emit('abrirTipos')" class="btn btn-info">
      Tipos de Renda
    </button>
    <button @click="salvar()" class="btn btn-success max-md:mt-2">
      Salvar
    </button>
  </div>
</template>
