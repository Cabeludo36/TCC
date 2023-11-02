import prisma from "../database/db";

type bodyType = {
  nome: string;
  ehEntrada: boolean;
  descricao: string;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as bodyType;

  let r = null;

  if (body.nome === null) {
    setResponseStatus(event, 400);
    return "nome é obrigatório";
  }
  if (body.ehEntrada === null) {
    setResponseStatus(event, 400);
    return "ehEntrada é obrigatório";
  }
  if (body.descricao === null) {
    setResponseStatus(event, 400);
    return "Descrição é o brigatória";
  }

  try {
    const newVal = await prisma.tipo_entrada_saida.create({
      data: {
        ehParaEntrada: body.ehEntrada,
        nome: body.nome,
        decricao: body.descricao,
      },
    });

    const tipos = await prisma.tipo_entrada_saida.findMany({
      select: {
        decricao: true,
        ehParaEntrada: true,
        id_tipo_entrada_saida: true,
        nome: true,
      },
    });
    r = {
      tipo: {
        id: newVal.id_tipo_entrada_saida,
        nome: newVal.nome,
        descricao: newVal.decricao,
        ehEntrada: newVal.ehParaEntrada,
      },
    };
    setResponseStatus(event, 200);
  } catch (error) {
    if (typeof error == "string") {
      setResponseStatus(event, 400);
      r = error;
    }
    setResponseStatus(event, 500);
    r = "Um erro inesperado ocorreu";
  } finally {
    await prisma.$disconnect();
    return r;
  }
});
