import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MuscleGroupCarouselStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import BodyIcon from "../../../icons/BodyIcon";
import "./styles.css"

const MuscleGroupCarousel = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5554/exercises/groups")
      .then((response) => {
        const fetchedGroups = response.data.data;
        setGroups(fetchedGroups); // Imposta i gruppi muscolari nello stato
        setLoading(false);
        console.log(fetchedGroups);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleGroupClick = async (group) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5554/exercises/groups/${group}`
      );
      setExercises(response.data.data);
      setSelectedGroup(group);
      setLoading(false);
      onGroupSelect(response.data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Swiper
        slidesPerView = {3}
        spaceBetween={30}

        navigation // Aggiungxe le frecce di navigazione
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {groups.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container">
              <div className="slide-content">
                <div className="card-wrapper">
                  <div className="image-content">
                    <span className="overlay"></span>
                    <div className="card-image">
                      <BodyIcon />
                    </div>
                  </div>
                  <div className="card-content">
                    <h2 className="name">{group}</h2>
                    <button
                      className="carousel-btn"
                      onClick={() => handleGroupClick(group)}
                    >
                      Visualizza
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MuscleGroupCarousel;