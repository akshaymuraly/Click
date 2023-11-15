import "../../../CSS/Admin/Admin-DoctorListTable.css";
import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

function DoctorsList() {
  const [data, setData] = useState([]);

  async function getdoctordetails() {
    try {
      const res = await axios.get("/admin/doctorslist", {
        withCredentials: true,
      });
      if (res.data.status) {
        setData(res.data.doctorsList);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function onClickHandler(item) {
    console.log(item._id);
    try {
      const res = await axios.put(`/admin/doctor/${item._id}`, {
        withCredentials: true,
      });
      if (res.data.status) {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getdoctordetails();
  }, []);
  console.log(data);
  return (
    <section className="container">
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>Address</th>
            <th>email</th>
            <th>Specialization</th>
            <th>admin Permission status</th>
            <th>Approve/dissaprove</th>
          </tr>
        </thead>
        <tbody>
          {data.length !== 0 ? (
            data.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.specialization}</td>
                <td>
                  {item.admin_permission !== undefined
                    ? String(item.admin_permission)
                    : "Not available"}
                </td>
                <td>
                  {item.admin_permission !== undefined ? (
                    String(item.admin_permission) === "true" ? (
                      <button
                        className="button-dissapprove"
                        onClick={() => onClickHandler(item)}
                      >
                        Dissaprove
                      </button>
                    ) : (
                      <button
                        className="button-approve"
                        onClick={() => onClickHandler(item)}
                      >
                        Approve
                      </button>
                    )
                  ) : (
                    "nothing"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>No data at the moment!</tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default DoctorsList;
