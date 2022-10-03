import React, { useState } from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import * as FetchApi from '../services/fetchApi';
import { Outlet } from 'react-router-dom';
import { useAddDragonMutation } from '../redux/selectionsApi';
import { useGetAllDragonsQuery } from '../redux/selectionsApi';
import { useDeleteDragonMutation } from '../redux/selectionsApi';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const HomePage = () => {
  const [dragonsData, setDragonsData] = useState();
  const location = useLocation();
  const [addDragon, { isLoading }] = useAddDragonMutation();
  const [deleteContact] = useDeleteDragonMutation();
  const { data } = useGetAllDragonsQuery();

  useEffect(() => {
    FetchApi.fetchDragons().then(data => setDragonsData(data));
  }, []);

  const handleAddDragon = async (name, id) => {
    const normalizedName = name.toLowerCase();
    if (data?.find(dragon => dragon.name.toLowerCase() === normalizedName)) {
      toast.warn('This dragon has already been chosen!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      await addDragon({ name: name, id: id });
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleDeleteDragon = async id => {
    try {
      await deleteContact(id);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <>
      <Container>
        <div className="dragonsList">
          <ul className="homePageLinks">
            {dragonsData &&
              dragonsData.map(item => {
                return (
                  <li key={item.id}>
                    <Link to={`/dragons/${item.id}`} state={{ from: location }}>
                      <img
                        src={item.flickr_images[0]}
                        className="homePageLinkImages"
                        alt={item.description}
                      />
                      <span className="homePageLinkText">{item.name}</span>
                    </Link>
                    <button className="button-39" onClick={() => handleAddDragon(item.name, item.id)}>
                      add to selection
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
        {isLoading && <p>Adding...</p>}

        {data?.length > 0 && (
          <div >
            <p>Your selected dragons : </p>
            <ul className="homePageLinks">
              {data.map(item => {
                return (
                  <li key={item.dragon_id}>
                    <Link
                      to={`/dragons/${item.dragon_id}`}
                      state={{ from: location }}
                    >
                      <span className="homePageLinkText">{item.name}</span>
                    </Link>
                    <button className="button-39" onClick={() => handleDeleteDragon(item._id)}>
                      delete from selection
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
      <ToastContainer autoClose={1000} />
      <Outlet />
    </>
  );
};

export default HomePage;
