import { useEffect, useState } from "react";
import "../CSS/lp-ourservices.css";
import axios from "axios";
import { GiButtonFinger } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export default function OurServices() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function getData() {
      const data = await axios.get(`/admin/populardoctors?page=${page}`);
      setItems(data.data.result);
      setTotal(data.data.total);
    }
    getData();
  }, [page]);

  return (
    <section className="lp-ourservices-container">
      <div className="lp-main">
        <div className="lp-ourservices-div1">
          <div className="lp-div1-item1">
            <span>Popular Search</span>
            <div className="lp-popular-searched">
              {!items || items.length === 0 ? (
                <div>Empty!</div>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="lp-popular lp-item1">
                    <p>name: {item.name}</p>
                    <button onClick={() => navigate(`/bookdoctor/${item._id}`)}>
                      Book
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="lp-popular-buttons-container">
              {Array.from({ length: Math.ceil(total / 5) }, (_, i) => (
                <button
                  className="lp-popular-buttons"
                  key={i}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="lp-div1-item2">2</div>
        </div>
        <div className="lp-ourservices-div2">2</div>
      </div>
    </section>
  );
}
