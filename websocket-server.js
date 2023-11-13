const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "luisgustavo20061@gmail.com",
        pass: "lmwr xead llux nuye",
    },
    debug: true,
    logger: true,
});

// Middleware para fazer o parsing da query string (req.query)
app.use(express.urlencoded({ extended: true }));

// Função assíncrona para envio de e-mails
const enviarEmail = async (data) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    const second = ("0" + now.getSeconds()).slice(-2);

    const diaFormatado = `${day}-${month}-${year} `;
    const horaFormatada = `${hour}:${minute}:${second}`;

    try {
        // Envia o e-mail
        const message = await transporter.sendMail({
            from: 'Super Error Log <luisgustavo20061@gmail.com>',
            to: data.Email,
            subject: "Erro no sistema",
            html: `O sistema "${data.Sistema}" apresentou o seguinte erro: ${data.Error}<br>Data: ${diaFormatado} às ${horaFormatada}`,
        });

        console.log(message);
    } catch (err) {
        console.error(err);
    }
};

// Rota para lidar com requisições GET
app.get('/monitorar-get', async (req, res) => {
    const data = req.query;
    console.log('Requisição GET recebida:', data);

    // Chama a função assíncrona para enviar o e-mail
    await enviarEmail(data);

    res.json({ status: `Recebido com sucesso ` });
});

// Inicia o servidor na porta especificada
const server = app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

// Monitora eventos de fechamento do servidor
server.on('close', () => {
    console.log('Servidor fechado');
});
