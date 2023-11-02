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

    //#region calculos dispesas, renda e diferença
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
        diferenca: Number(diferenca)
      }
    };
  } catch (error) {
    setResponseStatus(event, 500);
    return "Um erro inesperado ocorreu";
  } finally {
    setResponseStatus(event, 200);
    return r;
  }
});
