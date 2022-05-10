import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d22870aca984d7",
    pass: "c92d67064549a9"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Raphael Cardoso Petrére <teste@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })
  return res.status(201).json({ data: feedback });
})

app.listen(3333, () => {
  console.log('HTTP Server running!');
});