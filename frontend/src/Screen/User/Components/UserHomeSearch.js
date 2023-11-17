import React, { useEffect, useState } from "react";
import "./UserHomeSearch.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { userActions } from "../../../Store";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const UserHomeSearch = ({ query }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const [data, setData] = useState([]);

  async function getsearched() {
    dispatch(userActions.userStartLoading());
    try {
      const res = await axios.get(`/user/search?searchTerm=${query}`);
      setData(res.data.doctor);
      dispatch(userActions.userStopLoading());
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getsearched();
  }, [query]);
  // console.log(data, loading);
  return (
    <div className="uhs-container">
      <div className="uhs-sub-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((item, index) => {
            return (
              <div className="uhs-items" key={index}>
                <h1>{item.name}</h1>
                <Link to={`/bookdoctor/${item._id}`}>Book</Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserHomeSearch;
