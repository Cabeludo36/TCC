import prisma from "../database/db";

var numberPattern = /\d+/g;

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (id == null) {
    setResponseStatus(event, 400);
    return "ID é obrigatório para a ação.";
  }
  if (!numberPattern.test(id)) {
    setResponseStatus(event, 400);
    return "ID invalido.";
  }

  let r = null
  try {
    await prisma.entrada_saida.delete({
        where: {
            id_entrada_saida: Number(id)
        }
    })
    setResponseStatus(event, 200);
  } catch (error) {
    r = 'Um erro inesperado ocorreu'
    setResponseStatus(event, 500);
} finally {
    await prisma.$disconnect()
    return r;
  }
});
