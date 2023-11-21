import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/Search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search/new?query=${search}`
      );
      console.log(response.data);
      const res = response.data.tracks[0];
      const temp = {
        artist: res.artists[0].name,
        song: res.name,
        cover: res.album.images[1].url,
        rating: 10,
        review: "test",
      };
      setData([temp]);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [search]);

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
