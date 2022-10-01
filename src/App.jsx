import { Route, Routes } from 'react-router-dom';
import React, {  Suspense, lazy} from 'react';

import LoginPage from './pages/login';
import HomePage from './pages/homepage';
// import DragonPage from './pages/dragonpage';
import NavigationBar from './components/navbar';

import PrivateRoute from './routes/privateRoute';
import PublicRoute from './routes/publicRoute';


// const LoginPage = lazy(() => import('./pages/login'));
// const HomePage = lazy(() => import('./pages/homepage'));
const DragonPage = lazy(() => import('./pages/dragonpage'));
// const NavigationBar = lazy(() => import('./components/navbar'));



function App() {
  return (
    <div className="App">

      <NavigationBar />
      <Suspense fallback="Load...">
        <Routes>
          <Route
            exact path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
           <Route
            path="dragons/:itemId"
            element={
              <PrivateRoute>
                <DragonPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginPage />
              </PublicRoute>
            }
          />
           <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
