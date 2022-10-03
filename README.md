# Welcome to the Find Your Dragon

This app allows you to get information about SpaceX dragons.
And also make a list of your favorites among them.

### You can find deployed website here - https://incredible-cucurucho-a8f32b.netlify.app

### GitHub repository - https://github.com/rainb00w/dragons-app


## Installation

The core of this project was created with [Create React App](https://github.com/facebook/create-react-app).

Before start, you should install all dependencies :
`npm install`

In the project directory, you can run all standard Create React App commands :

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Back-end connections

Public queries to the SpaceX library can be found in the file `fetchApi.js`

For authorization and saving personal data, a self-written back-end is used. The `redux` library is used to connect to the database. It's divided into two logical components : 

`auth` folder contains authorization files with AsyncThunk syntax. ( LogIn, LogOut, Registration)

`selectionsApi.js` allows you to save and retrieve selected items. It uses more modern RTK Query syntax. ( Create item, Delete item, Get all items in the list )

## Usage

To use the application you need to register otherwise all other pages except the login will be hidden. 
During registration, you will receive an email from griffon.aneroid-0a@icloud.com

You should follow the link and then manually return to the main page.

## All the best !