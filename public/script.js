// function torol(id){
// fetch('http://localhost:3000/athalado/' + id, {
//     method: 'DELETE',
//   })
//   .then(res => res.text()) // or res.json()
//   .then(res => console.log(res))
// }

//const createEnv = require("env/lib/env");

function torol(id) {
  // Küldjünk DELETE kérést
  fetch('http://localhost:3000/athalado/' + id, {
      method: 'DELETE',
  })
  .then(res => {
      if (res.ok) {
          // Ha a törlés sikeres, eltávolítjuk az elemet a DOM-ból
          const elementToRemove = document.getElementById(`athaladas-${id}`); // Pl. ID alapján
          if (elementToRemove) {
              elementToRemove.remove();
          }
      } else {
          console.error('Hiba történt a törlés során.');
      }
  })
  .catch(error => {
      console.error('Hiba:', error);
  });
}


function modosit(id)
{
    
    fetch('http://localhost:3000/kapu_m'
    )
    .then(res => { 
        if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return adat = res.json();
    })
    .then(data =>
    { 
        const row = document.getElementById(`athaladas-${id}`)
        const cells = row.getElementsByTagName('td')
    
        if(!row.dataset.editing)
        {
            row.dataset.editing = "true"
    
            for(let i = 3; i < cells.length - 2; i++)
            {
                let ertek = cells[i].innerText.trim();
               
                if (i === 5)
                {
                    cells[i].innerHTML =
                    `
                      <label>
                    <input type="radio" name="irany_${i}" value="be" ${ertek.toLowerCase() === 'be' ? 'checked' : ''}>
                    Be
                </label>
                <label>
                    <input type="radio" name="irany_${i}" value="ki" ${ertek.toLowerCase() === 'ki' ? 'checked' : ''}>
                    Ki
                </label>
                    `
                }
                else if (i === 3)
                {
                    let htmlstring="<select id='kapu_id'>";
                    for (let index = 0; index < data.length; index++) {
                        if (ertek == data[index].epuletbejarat) {
                            htmlstring +=
                                `<option value="${data[index].id}" selected="selected">${data[index].epuletbejarat}</option>`
                        } else {
                            htmlstring +=
                                `<option value="${data[index].id}">${data[index].epuletbejarat}</option>`
                        }
                       
                    }
                    cells[i].innerHTML = htmlstring+"</select>";
                }
                else
                {
                    cells[i].innerHTML = `<input type="text" value="${ertek}" />`
                }
    
            }
    
            cells[cells.length - 1].innerHTML = `
                <button onclick="mentes(${id})" id="mentesgomb">Mentés</button>
                <button onclick="visszavonas(${id})" id="megsegomb">Mégse</button>
            `;
        }

    })
    .catch(error => console.log('Hiba:', error))

  
}

function mentes(id)
{
    const row = document.getElementById(`athaladas-${id}`);
    const inputok = row.getElementsByTagName('input');
    const selectek = row.getElementsByTagName('option');
    let x = document.getElementById("kapu_id").selectedIndex;
    console.log(selectek[x].value); // új azonosító értéke
    //console.log(selectek[x].defaultSelected); // új átjáró kiválasztva

    const Data_update = 
    {
        // Személy neve = nev
        // Azonosító = azonosito
        // Státusz = statusz
        // Kapubejárat = epuletbejarat
        // Időpont = idopont 0
        // Irány = irany 1 2
        //nev: inputok[0].value,
        //azonosito: inputok[1].value,
        //statusz: inputok[2].value,
        kapuid: selectek[x].value,
        idopont: inputok[0].value,
        irany:inputok[1].checked ? true : false        
    }

    fetch('http://localhost:3000/athalado/' + id, 
        {
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data_update)
        }
    )
    .then(res => res.json())
    .then(data =>
    {
        row.innerHTML =
        `
        <td>${data.Szemely.nev}</td>
            <td>${data.Szemely.azonosito}</td>
            <td>${data.Szemely.statusz}</td>
            <td>${data.Kapu.epuletbejarat}</td>
            <td>${data.idopont}</td>
            <td>${data.irany ? 'Be' : 'Ki'}</td>
            <td><button onclick="modosit(${id})" id="modositasgomb">Módosítás</button></td>
            <td><button onclick="torol(${id})" id="torles">Törlés</button></td>
        `;
        delete row.dataset.editing;
    }
    )
    .catch(error => console.log('Hiba:', error))
}

function visszavonas(id)
{
    location.reload();
}
