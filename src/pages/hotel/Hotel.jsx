import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const HotelId = location.pathname.split("/")[2]
  console.log("location ==> ", HotelId)
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${HotelId}`)

  const { date, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays + 1;
  }

  const days = dayDifference(date[0].endDate, date[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const HotelDataJSON = {
    "_id": "64404235a22de55bcf8e2830",
    "name": "SeaPearl",
    "type": "hotel",
    "city": "CoxBazar",
    "address": "CoxBazar",
    "distance": "500",
    "photos": [],
    "title": "Best Hotel",
    "descriptions": "Good Hotel",
    "rooms": [],
    "cheepestPrice": 6000,
    "featured": false,
    "__v": 0
  }

  const bookHandler = (boom) => { 
      if(user){
        setOpenModal(true);
      }
      else{
        navigate('/login')
      }
   }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {
        loading ?
          (
            "Loading..."
          )
          :
          (
            <div className="hotelContainer">
              {open && (
                <div className="slider">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpen(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("l")}
                  />
                  <div className="sliderWrapper">
                    <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("r")}
                  />
                </div>
              )}
              <div className="hotelWrapper">
                <button className="bookNow" onClick={bookHandler}>Reserve or Book Now!</button>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address} - {data.city}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – {data.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheepestPrice} at this property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">
                      {data.descriptions}
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      <b>${days * data.cheepestPrice * options.room}</b> ({days} nights)
                    </h2>
                    <button>Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
              <MailList />
              <Footer />
            </div>
          )
      }
      {openModal && <Reserve setOpen={setOpenModal} hotelId={HotelId} />}
    </div>
  );
};

export default Hotel;
