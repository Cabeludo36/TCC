export type tipoRendaDispesa = {
  id: number;
  nome: string;
  descricao: string;
  ehEntrada: boolean;
};

export type tipoDispesasRendaResumo = {
  dispeas: number;
  renda: number;
  diferenca: number;
};

export type tipoPorcentagemTiposDespesa = {
  soma: number;
  tipo: string;
  per: number;
};

export type tipoInfoTabelaGastosEntradas = {
  id_entrada_saida: number;
  data: string;
  valor: number;
  tipo: string;
  ehParaEntrada: boolean;
};
