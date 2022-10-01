import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import * as FetchApi from '../services/fetchApi';
import s from './dragonpage.module.scss';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DragonPage = () => {
  const [dragon, setDragon] = useState(null);
  const [error, setError] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    if (!dragon) {
      FetchApi.fetchDragonById(itemId)
        .then(data => setDragon(data))
        .catch(error => {
          console.log(error);
          setError(error);
        });
    }
  }, [itemId, dragon]);

  return (
    <>
      <Container>
        {!dragon && <p>Downloading</p>}
        {error && <div>There are no such dragon !</div>}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={2}
          navigation
          loop
          centeredSlides
          centeredSlidesBounds
          pagination={{ clickable: true }}
          className="myswiper"
        >
          {dragon?.flickr_images.map(image => (
            <SwiperSlide key={image}>
              <img src={image} className="img-fluid shadow-4" alt={image} />
            </SwiperSlide>
          ))}
        </Swiper>
        {dragon && (
          <>
            <p>Dragon name : {dragon.name} </p>
            <p>Dragon description : {dragon.description} </p>
            <p>Wiki LInk : {dragon.wikipedia} </p>
            <p>Height with trunk : {dragon.height_w_trunk.meters} m</p>
            <p>Orbit duration : {dragon.orbit_duration_yr} </p>
          </>
        )}
      </Container>
    </>
  );
};

export default DragonPage;
