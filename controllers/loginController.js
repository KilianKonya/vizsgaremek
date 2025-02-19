const { parse } = require('dotenv');
const Szemely = require('../models/szemely');


exports.getUserInfo = async (req, res) => {
   try {
        const { azonosito} = req.body; 
        const { jelszo} = req.body;
        const user = await Szemely.findOne( {where: {azonosito: azonosito}});
        
        if (user.jelszo == jelszo) {
            const body='';
            req.session.user = user || null;
            const statusz = user.statusz;
            req.session.status = statusz;
            //console.log(user.statusz);
            // res.render('layout',{body,user,statusz});
            res.redirect('/');
        } else {
            res.status(500).send('Hibás login...');
        }
        //res.render('szemelyek', { szemely });
        //res.send({Szemelyek});
    } catch (error) {
        res.status(500).send('Error retrieving login!');
    }
};
