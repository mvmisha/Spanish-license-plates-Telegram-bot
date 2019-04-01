const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json')
const token = config.token;
const patt = new RegExp('[0-9]{4}[a-zA-Z]{3}');
const bot = new TelegramBot(token, {
	polling: true
});

var Datos;
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var matricula = msg.text;
    if (patt.test(matricula)) {
        bot.sendMessage(chatId, 'Es una matricula valida, dame un segundo y te mando los datos');
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://www.atib.es/TA/modelos/Modelo.aspx?m=621');
            await page.type('#cph_main_cph_main_621_0_nifC',matricula);
            await page.type('#cph_main_cph_main_621_0_apenomC', matricula);
            await page.type('#cph_main_cph_main_621_0_numMatricu2', matricula);
            await page.type('#cph_main_cph_main_621_0_txtnif', matricula);
            await page.type('#cph_main_cph_main_621_0_txtnombre', matricula);
            await page.click('#cph_main_cph_main_621_0_lnkBuscarTrafico');
            await page.waitFor(20000);
            Datos = await page.evaluate(() => {
                return {
                    bastidor: document.getElementById('cph_main_cph_main_621_0_bastidorSV').value,
                    marca: document.getElementById('cph_main_cph_main_621_0_marcaVeh').value,
                    modelo: document.getElementById('cph_main_cph_main_621_0_modeloVeh').value,
                    cilindrada: document.getElementById('cph_main_cph_main_621_0_cilindrada').value,
                    fechaMat: document.getElementById('cph_main_cph_main_621_0_fechaMatri').value
                };
            });
            console.log('Datos:', Datos);
            bot.sendMessage(chatId, 'Esto es lo que he encontrado:\nMarca: ' + Datos.marca + '\nModelo: ' + Datos.modelo + '\nBastidor: ' + Datos.bastidor + '\nCilindrada: ' + Datos.cilindrada + '\nFecha de matriculacion: ' + Datos.fechaMat);
            await browser.close();
        })();

    } else {
        bot.sendMessage(chatId, 'No es una matricula valida');
    }
});
