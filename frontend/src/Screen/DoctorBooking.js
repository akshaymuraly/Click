import React, { useState, useEffect } from "react";
import "../CSS/Tokensele.css";
import MessageWindow from "../Components/MessageWindow";
import { useParams } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { userActions } from "../Store";
import axios from "axios";
axios.defaults.withCredentials = true;
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
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  async function getUserDetails() {
    try {
      const res = await axios.get("/user/userdetails", {
        withCredentials: true,
      });
      if (res.data.user) {
        setUserDetails(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function getDoctor() {
      const res = await axios.get(`/user/booking/${doctorId}`);
      setDoctorDetails(res.data.doctorList);
      console.log(res.data);
    }
    getDoctor();
    if (isLoggedIn) {
      getUserDetails();
    }
  }, []);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats(seatNumber);
    console.log(selectedSeats);
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setMessageVisible(true);
      return;
    }
    console.log(userDetails);
    try {
      const res = await axios.post(
        `/user/book/${doctorId}`,
        { userDetails },
        { withCredentials: true }
      );
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
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
                    name="token"
                    className={`token ${
                      selectedSeats === seatNumber ? "selected" : ""
                    }`}
                    //   className={`seat ${isSelected ? "selected" : ""}`}
                    onClick={(e) => {
                      handleSeatClick(seatNumber);
                      setUserDetails({ ...userDetails, token: seatNumber });
                    }}
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
                  <input
                    type="text"
                    value={userDetails.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Age: </td>
                <td>
                  <input
                    type="text"
                    value={userDetails.age}
                    name="age"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>
                  <input
                    type="text"
                    value={userDetails.address}
                    name="address"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>
                  <input
                    type="text"
                    value={userDetails.email}
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone: </td>
                <td>
                  <input
                    type="text"
                    value={userDetails.phone}
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>Date: </td>
                <td>
                  <input
                    type="text"
                    name="date"
                    onChange={(e) => handleChange(e)}
                  />
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
