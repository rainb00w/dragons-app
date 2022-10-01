import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          <div className={s.textContainer}>
            <p><span className={s.pTitle}>Dragon name :</span> {dragon.name} </p>
            <p><span className={s.pTitle}>Dragon description :</span> {dragon.description} </p>
            <p><span className={s.pTitle}>Wiki LInk :</span> {dragon.wikipedia} </p>
            <p><span className={s.pTitle}>Height with trunk :</span> {dragon.height_w_trunk.meters} m</p>
            <p><span className={s.pTitle}>Orbit duration :</span> {dragon.orbit_duration_yr} </p>
          </div>
        )}
      </Container>
    </>
  );
};

export default DragonPage;
