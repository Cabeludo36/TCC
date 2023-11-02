// define importações
import moment from "moment";
import prisma from "../database/db";
// define tipo de body da requisição
type bodyType = {
  quantia: number;
  tipo: string;
  quando: string;
};
// define arquico como endpoint da API
export default defineEventHandler(async (event) => {
  // le body da requisição
  const body = (await readBody(event)) as bodyType;
  let r = null;
  try {
    // insere valor de entrada no BD
    // usando prisma js
    await prisma.entrada_saida.create({
      data: {
        data: moment(body.quando, "DD/MM/YYYY", true).utc(false).toISOString(),
        valor: body.quantia,
        id_tipo_entrada_saida: Number(body.tipo),
      },
    });
    setResponseStatus(event, 200);
  } catch (error) {
    // em caso de erro verifica se foi um
    // erro já esperado
    if (typeof error == "string") {
      // define como erro já esperado e define
      // retorno que ira ao cliente
      setResponseStatus(event, 400);
      r = error;
    }
    setResponseStatus(event, 500);
    r = "Um erro inesperado ocorreu";
  } finally {
    // desconecta do BD
    await prisma.$disconnect();
    // retorna informação ao cliente
    return r;
  }
});
