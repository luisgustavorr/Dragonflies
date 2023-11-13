const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;

let transporter = nodemailer.createTransport({
    host: "smtps://smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "luisgustavo20061@gmail.com",
        pass: "lmwr xead llux nuye",
    },
});



// Middleware para fazer o parsing do corpo da requisição (req.body)
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para lidar com requisições POST

app.post('/monitorar-post', (req, res) => {
    const data = req.body;
    console.log('Requisição POST recebida:', data);
    const now = new Date();

    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    const second = ("0" + now.getSeconds()).slice(-2);
    const diaFormatado = `${day}-${month}-${year} `;
    const horaFormatada = `${hour}:${minute}:${second}`;
    // Aqui você pode realizar qualquer lógica desejada com os dados da requisição
    transporter.sendMail({
        from:'Super Error Log <luisgustavo20061@gmail.com>',
        to:data.Email,
        subject:"Erro no sistema",
        html: `O sistema "${data.Sistema}" apresentou o seguinte erro: ${data.Erro}<br>Data: ${diaFormatado} às ${horaFormatada}`,

    }).then(message => {
        console.log(message);
    }).catch(err=> {
        console.log(err)
    });
    res.json({ status: 'Recebido com sucesso' });
});

// Inicia o servidor na porta especificada
const server = app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

// Monitora eventos de fechamento do servidor
server.on('close', () => {
    console.log('Servidor fechado');
});
