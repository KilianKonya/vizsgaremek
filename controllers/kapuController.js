const Kapuk = require('../models/kapu');
const { use } = require('../routes/loginRoutes');


exports.getAllKapu = async (req, res) => {
    try {
        const user = req.session.user;
        const statusz = req.session.status;
        if (user != null)
        {
           
            const Kapu = await Kapuk.findAll();
            res.render('kapu', { Kapu, user, statusz }); // ejs -> kapu
         }
        else
        {
            res.redirect('/');
        }
        //res.send({Szemelyek});
    } catch (error) {
        res.status(500).send('Error retrieving kapu');
    }
};

exports.getAllKapu_m = async (req, res) => {
    try {
        const user = req.session.user;
        const statusz = req.session.status;
        if (user != null)
        {
           
            const Kapu = await Kapuk.findAll();
            res.send(Kapu); // ejs -> kapu
         }
        else
        {
            res.redirect('/');
        }
        //res.send({Szemelyek});
    } catch (error) {
        res.status(500).send('Error retrieving kapu');
    }
};

exports.createKapu = async (req, res) => {
    const { epuletbejarat } = req.body;
    try {
        await Kapuk.create({ epuletbejarat });
        res.redirect('/kapu');
    } catch (error) {
        res.status(500).send('Error creating kapuk');
    }
};
