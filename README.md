# Pokédex - IT2810-prosjekt3
Pokédex er en nettside der man kan søke, sortere og filtrere etter pokemoner for å finne ut mer om ulike pokemoner. Pokédex har info om alle pokemoner fra generasjon 1 (de første 151 pokemonene). Man kan se på dataen i både listeform og som ordsky. I disse fremvisningene vil kun en liten del av alle pokemonene vises, men brukeren kan laste inn flere ved å trykke på knappen på bunnen av nettsiden. Listeformen og ordskyen er knyttet sammen i og med at de deler dataen som de viser frem. Dette betyr at man kan søke, sortere, filtrere og laste inn flere pokemoner i begge fremvisningene! Dette mener vi er intuitivt, da brukeren bare trenger å forholde seg til ett datasett om gangen. I ordskyen vil de største navnene være de pokemonene med flest views (brukergenererte data). For å se mer info om de ulike pokemonene er det bare å trykke på et listeelement eller navnet til pokemonen i ordskyen.

## Oppsett av prosjektet

1. Klon repoet med SSH/HTTP i ønsket lokasjon.
2. Gå inn i backend-mappen og skriv `npm install` etterfulgt av `npm start`
3. Gå inn i frontend-mappen og skriv `npm install` etterfulgt av `npm start`

Nå skal nettsiden kjøres på http://localhost:3000.

## Testing

### Systematisk enhetstesting
Vi brukte Jest og Enzyme til systematisk enhetstesting. Alle funksjonelle komponenter har en tilknyttet testklasse, med unntak til funksjonelle komponenter med svært lite logikk og komponenter (f.eks LoadButton og FilterButton). Vi bruker de vanlige test funksjonene til Jest, men også i tillegg mock funksjonen for å mocke returverdiene gitt via redux. Enzyme bruker vi for å lage en “shallow rendering” av komponentene vi tester. Ved å mocke returverdiene gitt via redux, og bruke “shallow rendering”  kan vi se om komponentene opprettes riktig. F.eks. kan vi mocke returverdiene til å ha pokemon informasjon og deretter sjekke om tilsvarende pokemon komponenter opprettes på korrekt måte.

Vi har valgt å ikke bruke snapshot testing. Dette er fordi selv små endringer til nettsiden sin utseende kan fort forårsake at en snapshot feiler. Dette gjør at snapshotting gir mange falske alarmer, som gjør at snapshottingen mister mye av sin relevanse. 

#### Hvordan kjøre testene
Start alle testene.
```
npm test
a
```
NB! For å kjøre testene på du ha [satt opp prosjektet.](#Oppsett av prosjektet)

<br>

### Automatisert end-to-end testing
Til automatisert end-to-end testing brukte vi Cypress. I stedet for å gå inn på nettside, trykke på knapper, se etter endringer visuelt og inspisere med inspector-vinduet (som tar en god stund) implementerte vi tester med Cypress som automatiserte denne prosessen. Dette gjorde end-to-end testingen raskere og ikke minst sikrere. Cypress er god til å visualisere og gi tilbakemelding om tilstanden til nettsiden. I tillegg er den godt dokumentert.

Siden det er for tidskrevende å teste alle mulige tilfeller måtte vi teste det vi mente var viktig for nettsiden vår. Vi tester de ulike komponentene våre og deres funksjonalitet fra ende til ende. Dette innebærer blant annet at de ulike komponentene vises når skal, ved knappetrykk eller skriving i inputfelt og at når man trykker på filtreringsknapper vil riktige data bli hentet og vist på riktig måte mtp. innhold og sortering. På enkelte tester har vi brukt fixtures for å kunne teste med kjente data eller ikke påvirke de faktiske dataene i databasen, i tillegg til å senke kjøretiden ved å slippe å vente på respons. Testene kan du finne under `frontend/cypress/integration`.

#### Hvordan kjøre testene
Start backend.
```
cd backend
npm start
```
Start frontend.
```
cd ..
cd frontend
npm start
```
Start Cypress.
```
npm run cypress
```
Etter en liten stund vil et vindu åpnes. Trykk på “Run all specs”-knappen for å kjøre alle testene, eller en av spec-filene for å kjøre en spesifikk test.

NB! For å kjøre testene på du ha [satt opp prosjektet.](#Oppsett av prosjektet)


## Backend
Vi installerte en MongoDB database på virtuell maskin (NTNU server) med data om alle pokemonene fra generasjon 1, dvs 151 pokemoner. 
MongoDB er en noSQL database. Dette passet fint til vårt behov da vi ikke hadde et sterkt behov for relasjoner, i tillegg til at array-felt var nyttig for å sørge for en intuitiv og enkel databasestruktur som var lett å jobbe med. 
I databasen har vi en collection som heter “pokemon” (legg merke til at på engelsk er pokemon på flertallsform også pokemon). Denne har følgende felt: id, name, stats, types og views (antall ganger en bruker har sett nærmere på pokemonen). Vi migrerte denne dataen (alt utenom views) fra PokéAPI.co til databasen vår ved å skrive et python-script, for å slippe å legge inn all dataen manuelt.
Vi implementerte et REST API med Node.js og Express sammen med mongoose (for Mongodb objekt modellering). Vi implementerte to endepunkt:

### Endepunkt
#### 1: Hente pokemon
```
GET: http://localhost:5000/pokemon/
```
Henter all data om opptil 25 pokemoner. Brukes til sortering, filtrering etter navn og type og henting av pokemondata (searchbar, filterbuttons, pokemonlist...).

##### Suksess respons
```json
200 OK
[
  {
    "name": String,
    "types": Array,
    "id": String
    "_id": String,
    "stats": Array,
    "views": Number
  }
]
```
| Query parameter | Støttede verdier | Beskrivelse | Eksempel |
| ------ | ------ | ------ | ------ |
| skip | alle positive heltall | Bestemme hvor mange pokemoner man ønsker å hoppe over. | `/pokemon/?skip=10` vil hoppe over de 10 første pokemonene og returnere de etterfølgende. |
| type... | poison, grass, fire, psychic, normal, fighting, electric, flying, bug, ground, ice, fairy, rock, dragon, water, steel, ghost | Filtrere etter bestemt(e) type(r). | `/pokemon/?type=fire&type1=water` vil returnere pokemoner som er enten av flamme-type eller vann-type. |
| name | en streng | Spesifisere at man ønsker pokemoner med navn som inneholder angitt verdi. | `/pokemon/?name=saur` vil returnere pokemoner med navn som inneholder “saur” |
| sort | name, nameDESC, id, idDESC, views, viewsDESC | Sortere pokemonene i enten alfabetisk rekkefølge, etter id eller views. | `/pokemon/?sort=name` vil returnere pokemoner i alfabetisk rekkefølge. |
| limit | none | Spesifisere at man ønsker å hente alle pokemoner. | `/pokemon/?limit=none` vil hente alle pokemoner. |

#### 2: Legge inn brukergenererte data
```
PUT: http://localhost:5000/pokemon/:pokemonId
```
Her er pokemonId en parameter som spesifiserer hvilken pokemon (med id=pokemonId) sine views skal bli inkrementert med 1. Brukes til pokemon modalen og brukergenererte data.
##### Suksess respons
```json
200 OK
{
    "n": Number,
    "nModified": 1,
    "ok": 1
}
```

### Hvorfor to endepunkt?

Vi trengte ikke flere enn disse to endepunktene til prosjektet vårt. Den førstnevnte kan brukes til mye, blant annet sortering og filtrering. Det er to hovedårsaker til at vi lagde et endepunkt med mange query parametre:

1.  Vi fulgte https://restfulapi.net/resource-naming/ for navnekonvensjoner for endepunktene. Denne kilden fortalte oss at de ulike funksjonalitetene (sortering, filtrering…) passet godt som query parametre.
2.  Forenkling av design og struktur uten noe særlig stort tap. Forskjellen i loading-tid mellom å hente kun de detaljene vi trengte om pokemoner og å hente alle detaljer om pokemoner var neglisjerbar. Nettsiden vår vil hente alle detaljer om de første 25 pokemonene når du går inn på den. Dette gjør at vi slipper å gjøre et kall til REST API-et når brukeren trykker på en pokemon (og får opp flere detaljer om pokemonen) - og dette gjør vi uten å ofre noe stort. Dessuten blir designet og strukturen enklere. Derfor valgte vi ikke å lage egne endepunkt for å hente enkelte felt.

## Teknologier
### React
Prosjektet er basert på React og har blitt initialisert med create-react-app.
### Redux
Redux ble benyttet for state management i applikasjonen. Gruppen benyttet seg av “Reduck - ducks modular pattern” (https://github.com/erikras/ducks-modular-redux) for å strukturere Redux store. Det går ut på å samle logikken til actions, reducers og action creators i “ducks” som senere blir kombinert i en rootReducer. Vi valgte denne strukturen for å gjøre applikasjonen mer skalerbar. Redux thunk ble benyttet som middleware for å gjøre kall til databasen.

Hver duck var ansvarlig for å styre logikken til en state. I prosjektet vårt ble disse benyttet:

#### contentDuck
Styrer om PokemonWordCloud eller PokemonList skal vises til en hver tid.

**Action creators:**
* showPokemon sender beskjed til contentReducer slik at gjør at PokemonList vises.
* showWordCloud sender beskjed til contentReducer slik at PokemonWoreCloud vises.

<br>

#### modalDuck
Styrer logikken bak åpning og lukking av PokemonModal, samt hvilken pokemon som skal vises. Denne informasjonen er lagret i modalInfo.

**Action creators:**
*  openModal tar i mot informasjon om pokemonen og videresender dette til reduceren. Deretter blir modalInfo oppdatert.
*  closeModal  sender beskjed videre til reduceren og fører til at modalen lukkes.

<br>

#### pokemonDuck 
Styrer logikken til pokemon. Dette innebærer blant annet henting av pokemoner basert på søk, sortering og andre parametere.

**Action creators:**
*  fetchPokemon er funksjonen som brukes til å hente pokemon fra backenden. Den har flere mulige parametere for å gjøre søk mer spesifikke. Disse verdiene brukes for å strukturere kall til backend, med unntak av loadMore som  kun blir benyttet ved innlasting av mer data (ref. load more-knappen).  Dataen blir hentet med axios og sendt videre til enten fetchPokemonSuccess ved suksessfulle kall, eller fetchPokemonFailure når feil inntreffer.
*  fetchPokemonSuccess tar dataen fra fetchPokemon, legger til loadMore og sender den videre til pokemonReducer. Her blir loadMore brukt til å sjekke nye søkeparametere er lagt til eller om det er innlasting av mer data.
*  fetchPokemonFailure inntreffer hvis noe galt skjer i fetchPokemon. Det blir gitt beskjed til pokemonReducer og det blir kastet en feil med relevant feilmelding. Ved feil vil siden ikke laste opp da gruppen ikke så noe hensikt i å la brukere besøke siden med manglende funksjonalitet.
*  updateView brukes til å inkrementere views med en i frontend uten å måtte gjøre et nytt kall til backend for å oppdatere tallet. 

<br>

#### searchDuck
Oppdaterer søkestrengen til en hver tid.

**Action creators:**
*  updateSearch sender søkestrengen videre til searchReducer.

<br>

#### sortDuck
Bestemmer sorteringslogikken som brukes til å representere/hente pokemon.

**Action creators:**
*  fireAction tar i mot sortingsdata og videresender hva slags sortering som er valgt av brukeren til sortReducer.

<br>

#### typesDuck
Har kontroll på om hvilke pokemon-typer brukeren har valgt å sortere på. Sorterer på ingen ved default.

**Action creators:**
*  updateType tar i mot hvilke typer som blir trykket og sender det videre til typeReducer. Her blir type staten oppdatert.


## Acknowledgements
### Inspirasjon:
*  https://pokedex.org/

### Frontend pakker:
* Cypress - brukt for ende til ende testing
* Jest - brukt for enhetstester
* Enzyme - brukt som testverktøy for å teste React komponenter
* Redux + Redux Thunk - brukt for state management
* React Bootstrap - brukt for å vise
* React Wordcloud - brukt for å fremstille brukergenerert data
* Axios - brukt for å hente data fra endepunkter
* Lodash - brukt for å effektivisere søk og kall til backend

### Backend pakker:
* Cors - brukt for å konfigurere cross-origin resource sharing
* Dotenv - brukt for å skjule sensitiv database informasjon
* Express - brukt for å sette opp REST API
* Mongoose - brukt for objekt modellering i Node.js
* Nodemon - brukt for smidigere utvikling


