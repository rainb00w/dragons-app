# Welcome to the Find Your Dragon

This app allows you to get information about SpaceX dragons.
And also make a list of your favorites among them.

### You can find deployed website here - https://incredible-cucurucho-a8f32b.netlify.app

### GitHub repository - https://github.com/rainb00w/dragons-app



## Installation

The core of this project was created with [Create React App](https://github.com/facebook/create-react-app).

Before start, you should install all dependencies :
`npm install`

In the project directory, you can run all standart Create React App coomands :

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Back-end connections

Public queries to the SpaceX library can be found in the file `fetchApi.js`

For authorization and saving personal data, a self-written backend is used. The `redux` library is used to connect to the database. It is divided into two logical components : 


