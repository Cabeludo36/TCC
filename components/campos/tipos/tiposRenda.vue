<script setup lang="ts">
import type { tipoRendaDispesa } from "~/types/states";

defineEmits(["fecharTipos"]);
const tipos = useState<tipoRendaDispesa[]>("tiposDispesaEntrada");
const fecharTipos = ref<HTMLButtonElement>();

//#region nome
const nome = ref("");
const nomeError = ref("");
function verificaNome() {
  nomeError.value = "";
  if (nome.value.trim().length < 1) {
    nomeError.value = "Preencher nome";
    return false;
  }
  return true;
}
//#endregion

//#region descricao
const descricao = ref("");
const descricaoError = ref("");

function verificaDescricao() {
  descricaoError.value = "";
  if (descricao.value.trim().length < 1) {
    descricaoError.value = "Preencher descrição";
    return false;
  }
  return true;
}
//#endregion

//#region form
const formError = ref("");
const { error, data, execute, pending } = useFetch("/api/salvarTipo", {
  method: "POST",
  body: {
    nome: nome,
    descricao: descricao,
    ehEntrada: true,
  },
  immediate: false,
  lazy: false,
  watch: false,
});
pending.value = false;
function verificaForm() {
  const validacoes = [verificaNome(), verificaDescricao()];

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

  const retorno = data.value as Exclude<typeof data.value, string>;
  if (retorno?.tipo) {
    tipos.value.push(retorno.tipo);
  }
  fecharTipos.value?.click();
}
//#endregion
</script>
<template>
  <div class="w-full flex flex-col md:flex-row md:justify-between">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Nome da Renda</span>
      </label>
      <input
        v-model="nome"
        type="text"
        placeholder="Ex.: Dividendos, Vendas, Serviços"
        class="input input-bordered w-full bg-slate-200"
        v-bind:class="{ 'input-error': nomeError != '' }"
      />
      <label v-if="nomeError != ''" class="label">
        <span class="label-text-alt text-red-600">{{ nomeError }}</span>
      </label>
    </div>
  </div>
  <div class="w-full flex flex-col md:flex-row md:justify-between">
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Descrição da Renda</span>
      </label>
      <textarea
        v-model="descricao"
        class="textarea textarea-bordered h-16 max-h-16 bg-slate-200"
        v-bind:class="{ 'textarea-error': descricaoError != '' }"
        placeholder="Descrição"
      ></textarea>
      <label v-if="descricaoError != ''" class="label">
        <span class="label-text-alt text-red-600">{{ descricaoError }}</span>
      </label>
    </div>
  </div>
  <div v-if="formError != ''" class="alert alert-error mt-2">
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
  <div class="w-full flex flex-col md:flex-row md:justify-between mt-2">
    <button
      ref="fecharTipos"
      @click="$emit('fecharTipos')"
      class="btn btn-info"
      :disabled="pending"
    >
      Renda
    </button>
    <button
      @click="salvar()"
      class="btn btn-success max-md:mt-2"
      :disabled="pending"
    >
      Salvar
    </button>
  </div>
</template>
