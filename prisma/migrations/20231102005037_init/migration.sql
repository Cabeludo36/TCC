-- CreateTable
CREATE TABLE "public"."entrada_saida" (
    "id_entrada_saida" SERIAL NOT NULL,
    "id_tipo_entrada_saida" INTEGER NOT NULL,
    "valor" MONEY NOT NULL,

    CONSTRAINT "entrada_saida_pkey" PRIMARY KEY ("id_entrada_saida")
);

-- CreateTable
CREATE TABLE "public"."tipo_entrada_saida" (
    "id_tipo_entrada_saida" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "decricao" VARCHAR(200) NOT NULL,
    "ehParaEntrada" BOOLEAN NOT NULL,

    CONSTRAINT "tipo_entrada_saida_pkey" PRIMARY KEY ("id_tipo_entrada_saida")
);

-- AddForeignKey
ALTER TABLE "public"."entrada_saida" ADD CONSTRAINT "entrada_saida_id_tipo_entrada_saida_fkey" FOREIGN KEY ("id_tipo_entrada_saida") REFERENCES "public"."tipo_entrada_saida"("id_tipo_entrada_saida") ON DELETE RESTRICT ON UPDATE CASCADE;
