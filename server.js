require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //https -> true
}));



app.use(cors());
app.use(bodyParser.json());


const path = require('path');
app.set('views', path.join(__dirname, 'views')); // Nézetek helye
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



const szemelyRoutes = require('./routes/szemelyRoutes');
const kapuRoutes = require('./routes/kapuRoutes');
const athaladoRoutes = require('./routes/ataladasRoutes');
const loginRoutes = require('./routes/loginRoutes');
const fooldalRoutes = require('./routes/fooldalRoutes')


app.use('/', athaladoRoutes);
app.use('/', kapuRoutes);
app.use('/', loginRoutes);
app.use('/', szemelyRoutes);
app.use('/', fooldalRoutes);
app.use('/logout',loginRoutes);


const Szemely = require('./models/szemely');
const Athaladas = require('./models/athaladas'); 
const Kapu = require('./models/kapu');
const { stat } = require('fs');


sequelize.authenticate()
    .then(() => {
        console.log('Sikeresen csatlakoztunk az adatbázishoz.');
    })
    .catch((error) => {
        console.error('Nem sikerült kapcsolódni az adatbázishoz:', error.message);
        process.exit(1); // Az alkalmazás leállítása
    }); 

sequelize.sync({ force: true })
.then(async () => {
    console.log('Adatbázis feltöltése alapadatokkal.');
 try{
    // Alapértelmezett autók hozzáadása
    const szemely1 = await Szemely.create({ nev: 'Kismacska', azonosito:'Km', jelszo:'12345', statusz:'Portás', osztaly:''});
    const szemely2 = await Szemely.create({ nev: 'Nagymedve', azonosito:'Nm', jelszo:'98765', statusz:'Tanár', osztaly:''});
    const szemely3 = await Szemely.create({ nev: 'Kisegér', azonosito:'Ke', jelszo:'46582', statusz:'Osztályfőnök', osztaly:'12.B'});
    const szemely4 = await Szemely.create({ nev: 'Nagyróka', azonosito:'Nr', jelszo:'99999', statusz:'Igazgató'});

    const kapu1 = await Kapu.create({epuletbejarat: 'Asztrik tér'});
    const kapu2 = await Kapu.create({epuletbejarat: 'Martinovics porta'});
    
    const athaladas1 = await Athaladas.create({szemelyid: 1, kapuid: 1, idopont: "12:00:00", irany: 'false'});
    const athaladas2 = await Athaladas.create({szemelyid: 2, kapuid: 2, idopont: "12:00:00", irany: 'true'});
    const athaladas3 = await Athaladas.create({szemelyid: 3, kapuid: 2, idopont: "12:00:00", irany: 'false'});
    const athaladas4 = await Athaladas.create({szemelyid: 4, kapuid: 1, idopont: "12:00:00", irany: 'true'});
    console.log('Alapadatok sikeresen hozzáadva!');
 }
 catch (error) {
  console.error('Hiba történt az alapadatok feltöltésekor:', error.message);
  }

  app.listen(3000, () => {
    console.log('A szerver elérhető: http://localhost:3000');
  });
})

.catch((error) => {
console.error('Nem sikerült kapcsolódni az adatbázishoz:', error.message);
process.exit(1); // Az alkalmazás leállítása kritikus hiba esetén
});

app.put('/athalado/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { nev, azonosito, statusz, epuletbejarat, idopont, irany } = req.body;

    // Ellenőrizzük, hogy az áthaladás létezik-e
    const athaladas = await Athaladas.findByPk(id, {
      include: [{ model: Szemely }, { model: Kapu }]
    });

    if (!athaladas) {
      return res.status(404).json({ message: 'Nem található az elem!' });
    }

    // Frissítjük az adatokat
    await Szemely.update(
      { nev, azonosito, statusz },
      { where: { id: athaladas.szemelyid } }
    );

    await Kapu.update(
      { epuletbejarat },
      { where: { id: athaladas.kapuid } }
    );

    await Athaladas.update(
      { idopont, irany },
      { where: { id } }
    );

    res.json({
      Szemely: { nev, azonosito, statusz },
      Kapu: { epuletbejarat },
      idopont,
      irany
    });

  } catch (error) {
    console.error('Hiba a módosítás során:', error.message);
    res.status(500).json({ error: error.message });
  }
});
