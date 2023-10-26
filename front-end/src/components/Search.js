import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/Search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.mockaroo.com/api/d8caa150?count=3&key=9b1fc5d0")
      .then((res) => {
        setAllData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    const filteredData = allData.filter(
      (item) => item.artist.includes(search) || item.song.includes(search)
    );
    setData(filteredData);
    console.log(filteredData);
  }, [search, allData]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="searchBar">
        <input
          className="searchInput"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
        />
      </div>
      {data.map((item, index) => (
        <FeedComponent item={item} key={index} />
      ))}
    </div>
  );
}
