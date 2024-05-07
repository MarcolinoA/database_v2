import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MuscleGroupCarouselStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import BodyIcon from "../../../icons/BodyIcon";

const MuscleGroupCarousel = () => {
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /**
   * <div className="image-content">
                  <span className="overlay"></span>

                  <div className="card-image">
                    <img src="" alt="prova" className="card" />
                  </div>
                </div>

                <div className="card-content">
                  <h2 className="name">David Dell</h2>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et
                    amet repellendus eligendi voluptates omnis. Porro quo
                    aspernatur quas nihil molestiae eos, perspiciatis tempore,
                    animi dicta rerum non officia, nostrum quidem?
                  </p>

                  <button className="button">view-more</button>
                </div>
   */

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
          {groups.map((group) => (
            <>
              <div className="slide-container" key={group._id}>
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

                      <button className="carousel-btn">view-more</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MuscleGroupCarousel;
