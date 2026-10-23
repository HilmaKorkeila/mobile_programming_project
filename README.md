# Projektinhallintaohjelma

## Backendin käyttöönotto (express):
Vaatii `/api/.env`-tiedoston, jossa rivit (esimerkkiarvoilla)
  
```
MONGODB_URI=mongodb://admin:secretpassword@localhost:27017/?authSource=admin
PORT=1337
```
```
cd mobile_programming_project/api
npm install
npm start
```

## Frontendin käyttöönotto (expo+react-native):
Vaatii `/mobile/.env`-tiedoston, jossa rivi (esimerkkiarvolla)
```
EXPO_PUBLIC_API_BASE_URL=https://example.com/api
```
```
cd mobile_programming_project/mobile
npm install
npm start
```
