const { Szemely, Athaladas, Kapu } = require('../models');

exports.getAllAthaladas = async (req, res) => {
    try {
        const athaladasok = await Athaladas.findAll({
            include: [
                {
                    model: Szemely,
                    attributes: ['nev', 'azonosito', 'statusz'],
                },
                {
                    model: Kapu,
                    attributes: ['epuletbejarat'],
                },
            ],
        });
        const szemelyek = await Szemely.findAll();
        const kapuk = await Kapu.findAll();
        //console.log(JSON.stringify(athaladasok, null, 2)); // Adatok ellenőrzése
        const user = req.session.user || null;
        const statusz = req.session.status;
        res.render('fooldal', { athaladasok, szemelyek, kapuk, user, statusz });
    } catch (error) {
        console.error('Error retrieving athaladas:', error);
        res.status(500).send('Error retrieving athaladas');
    }
};