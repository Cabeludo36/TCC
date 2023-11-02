import prisma from "../database/db";

export default defineEventHandler(async (event) => {
  let r;
  try {
    const tipos = await prisma.tipo_entrada_saida.findMany({
      select: {
        decricao: true,
        ehParaEntrada: true,
        id_tipo_entrada_saida: true,
        nome: true,
      },
    });
    r = {
      tipos: tipos.map((x) => {
        return {
          id: x.id_tipo_entrada_saida,
          nome: x.nome,
          descricao: x.decricao,
          ehEntrada: x.ehParaEntrada,
        };
      }),
    };
  } catch (error) {
    setResponseStatus(event, 500);
    return "Um erro inesperado ocorreu";
  } finally {
    setResponseStatus(event, 200);
    return r;
  }
});
