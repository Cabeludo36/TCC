import type { tipoRendaDispesa } from "~/types/states";

export const tiposDispesaEntradaState = () =>
  useState<tipoRendaDispesa[]>("tiposDispesaEntrada", () => []);
