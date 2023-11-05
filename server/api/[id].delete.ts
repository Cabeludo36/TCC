import prisma from "../database/db";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  let idP = 0

  try {
    idP = Number(id)
  } catch (error) {
    setResponseStatus(event, 400);
    return "ID invalido.";
  }

  if (idP < 1) {
    setResponseStatus(event, 400);
    return "ID invalido.";
  }

  let r = null;
  try {
    await prisma.entrada_saida.delete({
      where: {
        id_entrada_saida: idP,
      },
    });
    setResponseStatus(event, 200);
  } catch (error) {
    r = "Um erro inesperado ocorreu";
    setResponseStatus(event, 500);
  } finally {
    await prisma.$disconnect();
    return r;
  }
});
