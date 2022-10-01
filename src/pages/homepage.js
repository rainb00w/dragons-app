import React, { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import * as FetchApi from '../services/fetchApi';
import { Outlet } from 'react-router-dom';

import { Link, useLocation } from 'react-router-dom';


const HomePage = () => {
  const [dragonsData, setDragonsData] = useState();
  const location = useLocation();
  console.log(dragonsData);

  useEffect(() => {
    FetchApi.fetchDragons().then(data => setDragonsData(data));
  }, []);

  return (
    <>
      <Container>
       

        <div className="dragonsList">
          {dragonsData &&
            dragonsData.map(item => {
              return (
                <li key={item.id}>
                  <Link to={`/dragons/${item.id}`} state={{ from: location }}>
                    {item.name}
                  </Link>
                </li>
              );
            })}
        </div>
      </Container>
      <Outlet />
    </>
  );
};

export default HomePage;
