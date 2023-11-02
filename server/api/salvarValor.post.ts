import moment from "moment";
import prisma from "../database/db";

type bodyType = {
  quantia: number;
  tipo: string;
  quando: string;
};

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as bodyType;

  let r = null;
  try {
    const newVal = await prisma.entrada_saida.create({
      data: {
        data: moment(body.quando).utc(false).toISOString(),
        valor: body.quantia,
        id_tipo_entrada_saida: Number(body.tipo),
      },
    });

    r = {
      newVal: newVal,
    };
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
