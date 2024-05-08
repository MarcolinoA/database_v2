import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MuscleGroupCarouselStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import BodyIcon from "../../../icons/BodyIcon";

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
        setGroups(response.data.data); // Ottieni i gruppi muscolari
        setLoading(false);
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
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          {groups.map((group, index) => (
            <div className="slide-container" key={index}>
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
          ))}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MuscleGroupCarousel;
