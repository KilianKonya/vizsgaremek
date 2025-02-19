const { where } = require('sequelize');
const { Szemely, Athaladas, Kapu } = require('../models');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

exports.getAllAthaladas = async (req, res) => {
    try {
        const user = req.session.user;
        const statusz = req.session.status;
        if (user!=null) {
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
            res.render('athaladas', { athaladasok, szemelyek, kapuk, user, statusz });
        } else {
          res.redirect('/');  
        }

    } catch (error) {
        console.error('Error retrieving athaladas:', error);
        res.status(500).send('Error retrieving athaladas');
    }
};



exports.createAthaladas  = async (req, res) => {

    const { szemely_id, kapu_id, idopont, irany } = req.body; 
    console.log(szemely_id);
    try {
       
        const athaladas = await Athaladas.create({
            
            szemelyid: szemely_id, 
            kapuid: kapu_id,
            idopont: idopont,
            irany: irany,
        });
   
        
    res.redirect('/athalado');
} catch (error) {
    console.error('Error creating athaladas:', error); // Hibakereséshez
    res.status(500).send('Error creating athaladas');
}

};


exports.deleteAthaladas = (req, res) => {
    const athaladas_id = req.params.id;
    console.log(athaladas_id);

    Athaladas.destroy({
        where: { id: athaladas_id }
    })
    .then(athaladas => {
        if (athaladas === 0) {
            console.log('Nem találtunk ilyen rekordot.');
            return res.status(404).send('Nincs ilyen rekord.');
        }
        console.log('Sikeres törlés:', athaladas);
        return res.status(200).send('Sikeres törlés');
    })
    .catch(error => {
        console.error('Error delete athaladas:', error); // Hibakereséshez
        res.status(500).send('Error delete athaladas');
    });
};


exports.updateAthaladas = async (req, res) => {
    /*const athaladas_id = req.params.id;
    console.log(athaladas_id);

    Athaladas.destroy({
        where: { id: athaladas_id }
    })
    .then(athaladas => {
        if (athaladas === 0) {
            console.log('Nem találtunk ilyen rekordot.');
            return res.status(404).send('Nincs ilyen rekord.');
        }
        console.log('Sikeres törlés:', athaladas);
        return res.status(200).send('Sikeres törlés');
    })
    .catch(error => {
        console.error('Error delete athaladas:', error); // Hibakereséshez
        res.status(500).send('Error delete athaladas');
    });
    
    
    
    // Change everyone without a last name to "Doe"
await User.update(
  { lastName: 'Doe' },
  {
    where: {
      lastName: null,
    },
  },
);
    */

try {
    const id = req.params.id;
    const { kapuid, idopont, irany } = req.body;
    
    // Megkeressük a módosítandó athaladas rekordot
    const athaladasRecord = await Athaladas.findOne({ where: { id } });
    if (!athaladasRecord) {
      return res.status(404).json({ error: 'Nincs ilyen rekord.' });
    }
    
    // Frissítjük az Athaladas rekordot (például az időpontot és az irányt)
    await Athaladas.update(
      { kapuid, idopont, irany },
      { where: { id } }
    );

    // Frissítjük a kapcsolódó Szemely rekordot
    // await Szemely.update(
    //   { nev, azonosito, statusz },
    //   { where: { id: athaladasRecord.szemelyid } }
    // );

    // Frissítjük a kapcsolódó Kapu rekordot
    // await Kapu.update(
    //   { epuletbejarat },
    //   { where: { id: athaladasRecord.kapuid } }
    // );

    // Lekérjük a frissített rekordot, hogy vissza tudjuk adni a kliensnek
    const updatedRecord = await Athaladas.findOne({
      where: { id },
      include: [Szemely, Kapu]
    });

    res.json(updatedRecord);
  } catch (error) {
    console.error('Error updating athaladas:', error);
    res.status(500).json({ error: 'Hiba történt a módosítás során.' });
  }
};