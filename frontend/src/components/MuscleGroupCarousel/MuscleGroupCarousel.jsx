import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MuscleGroupCarouselStyle.css";
import BodyIcon from "../../icons/BodyIcon";

const MuscleGroupCarousel = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]); // State variable for exercise groups
  const [selectedGroup, setSelectedGroup] = useState(null); // State variable for selected exercise group
  const [exercises, setExercises] = useState([]); // State variable for exercises
  const [loading, setLoading] = useState(false); // State variable for loading status
  const [currentIndex, setCurrentIndex] = useState(0); // State variable for current index of slide
  
  // Fetch exercise groups when component mounts
  useEffect(() => {
    setLoading(true); // Set loading status to true before making the request
    axios
      .get("http://localhost:5554/exercises/groups") // Send GET request to fetch exercise groups
      .then((response) => {
        const fetchedGroups = response.data.data; // Extract exercise groups from response
        setGroups(fetchedGroups); // Set exercise groups state with fetched data
        setLoading(false); // Set loading status to false after successful data retrieval
        console.log(fetchedGroups); // Log fetched exercise groups to console
      })
      .catch((error) => {
        console.log(error); // Log error to console
        setLoading(false); // Set loading status to false in case of error
      });
  }, []); // Empty dependency array ensures effect runs only once when component mounts
  
  // Function to handle click on exercise group
  const handleGroupClick = async (group) => {
    setLoading(true); // Set loading status to true
    try {
      const response = await axios.get( // Send GET request to fetch exercises for selected group
        `http://localhost:5554/exercises/groups/${group}`
      );
      setExercises(response.data.data); // Set exercises state with fetched data
      setSelectedGroup(group); // Set selected group state
      setLoading(false); // Set loading status to false after successful data retrieval
      onGroupSelect(response.data.data); // Call callback function to handle selection of group
    } catch (error) {
      console.log(error); // Log error to console
      setLoading(false); // Set loading status to false in case of error
    }
  };
  
  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= groups.length ? 0 : prevIndex + 1
    ); // Increment index or reset to 0 if at the end
  };
  
  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groups.length - 1 : prevIndex - 1
    ); // Decrement index or set to last index if at the beginning
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
