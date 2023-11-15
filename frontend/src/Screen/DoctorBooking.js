import React, { useState, useEffect } from "react";
import "../CSS/Tokensele.css";
import MessageWindow from "../Components/MessageWindow";
import { useParams } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store";
import axios from "axios";
// import "./SeatSelection.css";

const SeatSelection = () => {
  const [messageVisible, setMessageVisible] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { doctorId } = useParams();
  const totalSeats = 100;
  const rows = 10;
  const seatsPerRow = totalSeats / rows;
  const [doctorDetails, setDoctorDetails] = useState([]);

  useEffect(() => {
    async function getDoctor() {
      const res = await axios.get(`/user/booking/${doctorId}`);
      setDoctorDetails(res.data.doctorList);
      console.log(res.data);
    }
    getDoctor();
  }, []);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(seatNumber);
    console.log(selectedSeats);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setMessageVisible(true);
      return;
    }
  };

  return (
    <div className="seat-selection-container">
      <div className="section-one">
        <h2>Seat Selection</h2>
        <div className="seat-grid">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
                const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                //   const isSelected = selectedSeats.includes(seatNumber);
                return (
                  <div
                    key={seatNumber}
                    className={`token ${
                      selectedSeats === seatNumber ? "selected" : ""
                    }`}
                    //   className={`seat ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSeatClick(seatNumber)}
                  >
                    {seatNumber}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div>
          <p>Selected Seats: {selectedSeats}</p>
          {/* You can add a button to send the selected seats to the backend */}
        </div>
      </div>
      <div className="section-two">
        <form
          action=""
          className="section-two-form"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <table style={{ borderSpacing: "0 10px" }}>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>
                  <span className="doctor-details">{doctorDetails.name}</span>
                </td>
              </tr>
              <tr>
                <td>Specialization: </td>
                <td>
                  <span className="doctor-details">
                    {doctorDetails.specialization}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Status: </td>
                <td>
                  <span className="doctor-details">We will set it later!</span>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <div className="heading-booking">Booking details</div>
                </td>
              </tr>
              <tr>
                <td>Name: </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Age: </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Phone: </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>Date: </td>
                <td>
                  <input type="date" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="book-button-container">
            <span>Token: {selectedSeats}</span>
            <button type="submit" className="book-button">
              Book
            </button>
            {messageVisible && (
              <MessageWindow
                messageVisible={messageVisible}
                setMessageVisible={setMessageVisible}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeatSelection;
