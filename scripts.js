//  ############################  //
//  #                          #  //
//  #  Javacriptramverk JSR200 #  //
//  #  Checkpoint 1            #  //
//  #  Mikael Hoffsten         #  //
//  #  Köp Lista               #  //
//  #  2024-11-14              #  //
//  #                          #  //
//  ############################  //

/* 
######### UPPGIFT ##############

Här skapar ni en enklare JavaScript-applikation. 
Uppgiftens syfte är att ni övar på grundläggande JavaScript.
Så i uppgiften skriver man endast Vanilla Javascript. Inga ramverk.
Så att ni har grunderna i Javascript klara inför kommande uppgifter.

Bygg en enklare applikation som listar en array. 
I denna array kan man lägga till, ta bort och editera de olika posterna. 
Liknande bilden under. 
Så via HTML-gränssnittet kan man manipulera array:en. 
När array:en manipuleras så uppdateras HTML med den information som finns i array:en. 

##################################
*/

console.log("Sidan startar!");
console.log(" ");

//########## variabler ###########

var varor = []; // array där alla varor ligger i köplistan.
var reDoLista = ""; // den skapar html kod till "senasteBorttagnaVara"
var senasteBorttagnaVara = ""; // sparar den raderade varan och används i "angraVara Funtionen"

//######### Funktioner ###########

// vissaVaror loppar igenom "varor" och skapar en lista med varge item i arrayen med Html kod
function vissaVaror() {
  var lista = ""; // gör listan tom
  for (var i = 0; i < varor.length; i++) {
    // loppar igenom varorna
    // lägger till varan i listan och skapar en html lista förvarge item, kallar på escapeHTML för att
    // kotrollera att den inte innehåller skadliga texen för html i varor
    // lägger till två knappar med id (i) som varan har. knapparna är koplade med två funtioner "ändra" och "radera"
    lista += ` 
      <tr>
        <td>${escapeHTML(varor[i])}</td>
        <td><button onclick="andraVara(${i})" class="btn btn-primary btn-sm">Ändra</button></td>
        <td><button onclick="raderaVara(${i})" class="btn btn-danger btn-sm">Radera</button></td>
      </tr>
    `;
  }
  document.querySelector("#varLista").innerHTML = lista; // vissar vägen var listan ska byggas i html
  console.log("listan är uppdaterad och inläst");
  console.log(" "); // gör det lättare att läsa consol loggen
}

// leggTillVara lägger till det skrivna i fälltet och lägger till det i Varor genom knapptryck
function leggTillVara() {
  console.log("Lägga till Knappen klickades på"); //medalar att knappen har trycks på

  var nyVara = escapeHTML(document.querySelector("#leggTillVara").value); // lägger in texten i variablen nyVara
  if (nyVara !== "") {
    // ett krav att nyVara får inte vara tom
    varor.push(nyVara); // lägger till nyVara sist i Arratyen
    document.querySelector("#felmedelande").innerHTML = ""; // resetar felmedelandet
    document.querySelector("#leggTillVara").value = ""; // resetar inmatningsfältet.
    sparaVaror(); // sparar i localStorage

    console.log("varan är inlagd!");
  } else {
    //om inmatningsfället är tomt så kommer ett fel medelande
    console.log("inget ifylt! ingen ändring har hänt!");
    document.querySelector("#felmedelande").innerHTML = // skriver ut i Html sidan
      "du behöver fylla i rutan!";
  }

  //startar funtionen och vissar alla varor när ny vara tillkommit
  vissaVaror();
}

// raderaVara raderar varan som är kopplat med id till knappen för varan. och lägger till "senasteBorttagnaVara" och skapar "reDoLista" html kod
function raderaVara(id) {
  senasteBorttagnaVara = varor[id]; // Spara den senaste borttagna varan
  console.log("Ta bort knappen klickades på ");

  varor.splice(id, 1); // Ta bort varan från arrayen

  // Uppdatera reDoLista för att visa den senast borttagna varan med en "Ångra"-knapp
  reDoLista = `
      <tr">
        <td >${senasteBorttagnaVara}</td>
        <td><button onclick="angraRadering()" class="btn btn-success btn-sm ms-4" >Ångra</button></td>
      </tr>
    `;

  document.querySelector("#senasteBortTagna").innerHTML = reDoLista; // vissar vart reDoListan ska vara i Html
  document.querySelector("#senasteBortTitel").innerHTML = "Senaset bortagna"; // ändrar Titel

  console.log("varan " + senasteBorttagnaVara + " är raderad");

  sparaVaror(); // sparar
  vissaVaror(); // laddar om listan
}

// angraRadering lägger tillbaka "senasteBorttagnaVara" i "varor" och tömmer "senasteBorttagnaVara" och reDoLista.
function angraRadering() {
  console.log("ångra knappen tryckades på");

  varor.push(senasteBorttagnaVara); // läggar tillbaka den i varor sist i arrayen
  console.log(
    "varan " + senasteBorttagnaVara + " har lakts tillbaka i listan!"
  );
  senasteBorttagnaVara = ""; // tarbort de i
  reDoLista = ""; // tarbort de i
  document.querySelector("#senasteBortTagna").innerHTML = reDoLista; // tar bort
  document.querySelector("#senasteBortTitel").innerHTML = ""; // tar bort titlen
  sparaVaror(); // uppdaterar
  vissaVaror(); // uppdaterar
}

// andraVara ändrar varan genom knapptryckning som är kopplad med id. det kommer upp en promt där man skriver in det nya namnet.
function andraVara(id) {
  console.log("ändra knappen tryckdes på " + id);

  var nyttNamn = prompt("ange det nya namnet", varor[id]); // en ruta kommer upp där man får fylla i det nya namnet.
  if (nyttNamn !== "" && nyttNamn !== null) {
    // om det är det är tomt eller null så händer inget
    console.log("varan " + varor[id] + " ändrades till " + nyttNamn);
    varor[id] = nyttNamn; // ersätter det gammal med det nya
    sparaVaror(); // sparar
    vissaVaror(); // vissar upp listan
  } else {
    alert("Text fältet får inte vara tomt!");
  }
}

// escapeHTML tar bort några skadliga teken för html kod som kan matas in i fälten och erätter dom med annt.
function escapeHTML(text) {
  // hittade på https://www.geeksforgeeks.org/how-to-escape-unescape-html-characters-in-string-in-javascript/
  console.log("kollar efter skadlig tecken!");
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Funktion för att spara varor i localStorage
function sparaVaror() {
  // Denna funktion konverterar arrayen `varor` till en sträng och sparar den i localStorage.
  // JSON.stringify konverterar arrayen till en JSON-sträng, eftersom localStorage endast kan lagra strängar.

  // Läst på https://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse

  localStorage.setItem("varor", JSON.stringify(varor)); // Sparar `varor` som JSON-sträng i localStorage
  console.log("sparar varor i localStorage");
}

// Funktion för att hämta varor från localStorage när sidan laddas
function hamtaVaror() {
  // Denna funktion hämtar `varor` från localStorage och konverterar JSON-strängen tillbaka till en array.
  // JSON.parse omvandlar JSON-strängen från localStorage till en array igen, så att vi kan använda den i JavaScript.

  // Läst på https://stackoverflow.com/questions/23728626/localstorage-and-json-stringify-json-parse
  const sparadeVaror = localStorage.getItem("varor"); // Hämtar `varor` från localStorage
  if (sparadeVaror) {
    // Kontroll för att se om data finns i localStorage
    varor = JSON.parse(sparadeVaror); // Omvandlar JSON-strängen till array och sparar i `varor`
    console.log("hämtar varor från localStorage");
  }
}

// ###### Startar upp sidan #####

hamtaVaror(); // kallar på funtionen att Hämta sparade varor.
vissaVaror(); // kallar på funtionen att vissa listan med varor.

//###### EventListener #######

// lyssnar efter att man ska trycka på knappen till en vara.
document
  .querySelector("#leggTillVaraKnapp")
  .addEventListener("click", leggTillVara);

// ###########################################

// säger till att den har läst igenom all java-cript kod.
console.log("Sidan har laddat klart!");
console.log(" ");
