const Szemely = require('../models/szemely');


exports.getAllSzemely = async (req, res) => {
    try {
        const user = req.session.user;
        const statusz = req.session.status;
        if (user != null)
        {
            
            const szemely = await Szemely.findAll();
            res.render('szemelyek', { szemely, user, statusz });
        }
        else
        {
            res.redirect('/'); 
        }
        //res.send({Szemelyek});
    } catch (error) {
        res.status(500).send('Error retrieving szemely');
    }
};

exports.createSzemely = async (req, res) => {
    const { nev, azonosito, jelszo, statusz, osztaly, idopont } = req.body;
    try {
        await Szemely.create({ nev, azonosito, jelszo, statusz, osztaly, idopont });
        res.redirect('/szemelyek');
    } catch (error) {
        res.status(500).send('Error creating szemely');
    }
};
