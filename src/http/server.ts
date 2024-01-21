import fastify from "fastify";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { R2 } from "../lib/cloudflare";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();

// Rota raiz para verificar se o servidor está funcionando
app.get("/", () => {
  return "hello world";
});

// Rota para upload de arquivos
// Valida o corpo da requisição e cria uma URL assinada para o R2
app.post("/uploads", async (request, reply) => {
  try {
    const uploadBodySchema = z.object({
      name: z.string().min(1),
      contentType: z.string(),
    });

    const { name, contentType } = uploadBodySchema.parse(request.body);

    const fileKey = randomUUID().concat("-").concat(name);

    const signedUrl = await getSignedUrl(
      R2,
      new PutObjectCommand({
        Bucket: "your-R2-bucket",
        Key: fileKey,
        ContentType: contentType,
      }),
      { expiresIn: 3600 }
    );

    const file = await prisma.file.create({
      data: {
        name,
        key: fileKey,
        contentType,
      },
    });
    return { signedUrl, fileId: file.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Tratamento de erros de validação Zod
      reply.status(400).send({
        status: "error",
        message: "Dados de entrada inválidos",
        errors: error,
      });
    } else {
      // Erros inesperados
      console.error(error);
      reply.status(500).send({
        status: "error",
        message: "Erro interno no servidor",
      });
    }
  }
});

app.get("/uploads/:id", async (request) => {
  const getFileParamsSchema = z.object({
    id: z.string().cuid(),
  });

  const { id } = getFileParamsSchema.parse(request.params);

  const file = await prisma.file.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const signedUrl = await getSignedUrl(
    R2,
    new GetObjectCommand({
      Bucket: "your-R2-bucket",
      Key: file.key,
    }),
    { expiresIn: 3600 }
  );

  return { signedUrl };
});

// Iniciar o servidor
app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server running!");
  });
