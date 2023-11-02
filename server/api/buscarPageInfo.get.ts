import prisma from "../database/db";

export default defineEventHandler(async (event) => {
  let r;
  try {
    //#region tipos
    const tipos = await prisma.tipo_entrada_saida.findMany({
      select: {
        decricao: true,
        ehParaEntrada: true,
        id_tipo_entrada_saida: true,
        nome: true,
      },
    });
    //#endregion

    //#region calculos dispesas, renda, diferença e porcentagem
    const dispeas = await prisma.entrada_saida.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        tipo_entrada_saida: {
          ehParaEntrada: false,
        },
      },
    });

    const renda = await prisma.entrada_saida.aggregate({
      _sum: {
        valor: true,
      },
      where: {
        tipo_entrada_saida: {
          ehParaEntrada: true,
        },
      },
    });

    let diferenca = null;
    if (renda._sum.valor !== null && dispeas._sum.valor !== null) {
      diferenca = Number(Number(renda._sum.valor) - Number(dispeas._sum.valor));
    }

    let porcentagem = null;
    if (diferenca !== null) {
      porcentagem = (100 / Number(renda._sum.valor)) * diferenca;
    }
    //#endregion

    //#region porcentagem cada gasto
    let porcentagemGastos;
    const gbTipoSaida = await prisma.entrada_saida.groupBy({
      by: "id_tipo_entrada_saida",
      _sum: {
        valor: true,
      },
      where: {
        tipo_entrada_saida: {
          ehParaEntrada: false,
        },
      },
    });

    porcentagemGastos = gbTipoSaida.map((x) => {
      const tipo = tipos.filter(
        (y) => y.id_tipo_entrada_saida == x.id_tipo_entrada_saida
      )[0];

      const per = (100 / Number(dispeas._sum.valor)) * Number(x._sum.valor);
      return { soma: Number(x._sum.valor), tipo: tipo.nome, per: per };
    });
    
    //#endregion
    r = {
      tipos: tipos.map((x) => {
        return {
          id: x.id_tipo_entrada_saida,
          nome: x.nome,
          descricao: x.decricao,
          ehEntrada: x.ehParaEntrada,
        };
      }),
      dispesasRendaResumo: {
        dispeas: Number(dispeas._sum.valor),
        renda: Number(renda._sum.valor),
        diferenca: Number(diferenca),
      },
      porcentagemRestante: Number(porcentagem),
      porcentagemGastos: porcentagemGastos,
    };
  } catch (error) {
    setResponseStatus(event, 500);
    return "Um erro inesperado ocorreu";
  } finally {
    setResponseStatus(event, 200);
    return r;
  }
});
