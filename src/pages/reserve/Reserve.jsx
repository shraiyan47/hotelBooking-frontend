import React, { useContext, useState } from 'react';
import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from "../../hooks/useFetch"
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Reserve({ setOpen, hotelId }) {

  const { data, loading, error } = useFetch(`/hotels/rooms/${hotelId}`)
  const [selectedRooms, setSelectedRooms] = useState([])

  const handleSelectRoomNumber = (e) => {
    const selected = e.target.checked
    const value = e.target.value
    setSelectedRooms(selected ?
      [...selectedRooms, value]
      :
      selectedRooms.filter((item) => item !== value)
    )
  }

  //  console.log("selectedRooms ==> ",selectedRooms)

  const { date } = useContext(SearchContext)

  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let list = []
    while (date <= end) {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return list
  }

  const allDates = getDatesRange(date[0].startDate, date[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDate.some(date =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound
  }
 
  const navi = useNavigate()


  const handleReserve = async (x) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/available/${roomId}`, 
          { 
            dates: allDates 
          });
          return res.data;
        })
      )
      setOpen(false)
      navi('/')
      
    } catch (error) {

    }
  }
  return (
    <div>
      {
        loading ? "Loading..." :
          <>
            <div className="reserve">
              <div className="rContainer">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className='rClose'
                  onClick={() => setOpen(false)}
                />
                <span>
                  Select Your Rooms:
                </span>
                {data.map((item) =>
                  <div className="rItem" key={item._id}>
                    <div className="rItemInfo">
                      <div className="rTitle">{item.title}</div>
                      <div className="rDesc">{item.desc}</div>
                      <div className="rMax">Max People: {item.maxPeople}</div>
                      <div className="rPrice">{item.price}</div>

                    </div>

                    {item.roomNumbers.map((roomNumber) =>
                      <div className="room">
                        <label htmlFor="roomnumber">{roomNumber.rNumber}</label>
                        <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelectRoomNumber} />
                      </div>
                    )}
                  </div>

                )}
              </div>
              <button onClick={handleReserve} className="rButton">Reserve Now!</button>
              {/* {JSON.stringify(data)} */}

            </div>

          </>
      }
    </div>
  )
}
