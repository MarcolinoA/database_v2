import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MuscleGroupCarouselStyle.css";
import BodyIcon from "../../icons/BodyIcon";

const MuscleGroupCarousel = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5554/exercises/groups")
      .then((response) => {
        const fetchedGroups = response.data.data;
        setGroups(fetchedGroups);
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= groups.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groups.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-control prev" onClick={prevSlide}>
        &lt;
      </button>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${(currentIndex * 100) / 3}%)`,
          }}
        >
          {groups.map((group, index) => (
            <div className="slide" key={index}>
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
                      <h2 className="group-name">{group}</h2>
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
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-control next" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default MuscleGroupCarousel;
