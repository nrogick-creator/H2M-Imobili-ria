import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "SENDGRID_API_KEY faltando" }, { status: 500 });
    }

    sgMail.setApiKey(apiKey);

    const { nome, email, telefone, assunto, mensagem } = await req.json();

    await sgMail.send({
      to: "juridico@h2mimobiliaria.com",
      from: "no-reply@h2mimobiliaria.com.br",
      replyTo: email,
      subject: `[Contato do Site] ${assunto}`,
      text: `Nome: ${nome}
Email: ${email}
Telefone: ${telefone || "-"}

Mensagem:
${mensagem}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro no envio:", err);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }
}
