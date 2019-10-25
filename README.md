# Pokédex - IT2810-prosjekt3
Pokédex er en nettside der man kan søke, sortere og filtrere etter pokemoner for å finne ut mer om ulike pokemoner. 
Pokédex har info om alle pokemoner fra generasjon 1 (de første 151 pokemonene). Man kan se på dataen i både listeform og som ordsky. I disse fremvisningene vil kun en liten del av alle pokemonene vises, men brukeren kan laste inn flere ved å trykke på knappen på bunnen av nettsiden.
Listeformen og ordskyen er knyttet sammen i og med at de deler dataen som de viser frem. Dette betyr at man kan søke, sortere, filtrere og laste inn flere pokemoner i begge fremvisningene! For å se mer info om de ulike pokemonene er det bare å trykke på et listeelement eller navnet til pokemonen i ordskyen.
I ordskyen vil de største navnene være de pokemonene med flest views (brukergenererte data).

## Oppsett av prosjektet

1. Klon repoet med SSH/HTTP i ønsket lokasjon.
2. Gå inn i backend-mappen og skriv npm install etterfulgt av npm start
3. Gå inn i frontend-mappen og skriv npm install etterfulgt av npm start

## Testing


## Backend - server og REST API
Vi installerte en MongoDB database på virtuell maskin (NTNU server) med data om alle pokemonene fra generasjon 1, dvs 151 pokemoner. 
MongoDB er en noSQL database. Dette passet fint til vårt behov da vi ikke hadde et sterkt behov for relasjoner, i tillegg til at array-felt var nyttig for å sørge for en intuitiv og enkel databasestruktur som var lett å jobbe med. 
I databasen har vi en collection som heter “pokemon” (legg merke til at på engelsk er pokemon på flertallsform også pokemon). Denne har følgende felt: id, name, stats, types og views (antall ganger en bruker har sett nærmere på pokemonen). Vi migrerte denne dataen (alt utenom views) fra PokéAPI.co til databasen vår ved å skrive et python-script, for å slippe å legge inn all dataen manuelt.
Vi implementerte et REST API med Node.js og Express sammen med mongoose (for Mongodb objekt modellering). Vi lagde to endepunkter:

### Hente pokemon
```
GET: http://localhost:5000/pokemon/

```
#### Success response:
```json
200 OK
[
  {
    "name": String,
    "types": Array,
    "id": String
    "_id": String,
    "views": Int
  }
]
```