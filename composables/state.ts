import type {
  tipoDispesasRendaResumo,
  tipoInfoTabelaGastosEntradas,
  tipoPorcentagemTiposDespesa,
  tipoRendaDispesa,
} from "~/types/states";

export const tiposRendaDispesaState = () =>
  useState<tipoRendaDispesa[]>("tiposRendaDispesa", () => []);
export const dispesasRendaResumoState = () =>
  useState<tipoDispesasRendaResumo>("dispesasRendaResumo", () => {
    return { dispeas: 0, renda: 0, diferenca: 0 };
  });
export const porcentagemState = () => useState<number>("porcentagem", () => 0);
export const porcentagemTiposDespesaState = () =>
  useState<tipoPorcentagemTiposDespesa[]>("porcentagemTiposDespesa", () => []);
export const infoTabelaGastosEntradasState = () =>
  useState<tipoInfoTabelaGastosEntradas[]>(
    "infoTabelaGastosEntradas",
    () => []
  );
