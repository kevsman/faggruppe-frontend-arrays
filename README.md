# Faggruppe front-end array functions

Prosjektet inneholder oppgaver for array functions der du
disse må løses for at siden skal fungere.

## Oppgaver
Det er 10 oppgaver spredt rundt i koden. Du trenger ikke endre andre ting
enn det som står i oppgavene for at nettsiden skal kjøre. De er nummerert fra 
1-10

- Begynn i Home.tsx
- Når den er løst gå videre til Stats.tsx
- Gå deretter videre til Game.tsx
    - Her finner du oppgave 6,8 og 10
- Oppgave 7 finner du i utils/rankUtils.ts
- Oppgave 9 finner du i utils/cardUtils.ts

## Eksempler på funksjoner

``` const hasSomeObject = array.some(object => value === searchValue);```  
``` const object = array.find(object => value === searchValue);```  
``` const filteredArray = array.filter(object => value === searchValue);```  
``` const sum = array.reduce((previousValue, currentValue) => value += searchValue, 0);```  

Tips: .reduce() som gitt ovenfor inneholder en initial value = 0. Denne kan være en hvilken
som helst objekt-type og er det som styrer hvilken type funksjonen returnerer. 
Dersom man vil returnere et TypeScript object kan man gjøre det på denne måten:  
``` const someObject = array.reduce((myObject, currentObject) => myObject.someValue > searchValue ? currentValue : myObject, {} as Player)```  

``` const sortedArrayAsc = array.sort((first, second) => first - second);```  
``` const sortedArrayDesc = array.sort((first, second) => second - first);```  
``` const objectIndex = array.findIndex(object => object === searchValue);```  

``` const shortenedArray = array.slice(0, 2);```  
``` const elementsRemovedFromArray = array.splice(1, 2);```  
slice endrer ikke den originale listen. Den returnerer kun en ny liste mellom start og stop index  
splice endrer den originale listen. I dette tilfelle fjernes to elementer med start fra index = 1.
Elementene returneres i en ny liste.   

## For å starte
Åpne terminalen og kjør
### `npm install`
### `npm start`

Den starter på http://localhost:3000

