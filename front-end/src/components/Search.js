import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/Search.css";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchType, setSearchType] = useState("song");

  const fetchData = async () => {
    try {
      if (searchType == "song") {
        const response = await axios.get(
          `http://localhost:3000/search/song?query=${search}`
        );
        const res = response.data.tracks[0];
        const temp = {
          artist: res.artists[0].name,
          song: res.name,
          cover: res.album.images[1].url,
          rating: 10,
          review: "test",
        };
        setData([temp]);
      } else if (searchType == "artist") {
        const response = await axios.get(
          `http://localhost:3000/search/artist?query=${search}`
        );
        const res = response.data.tracks;
        console.log(res);
        const tracksData = res.map((track, index) => {
          return {
            artist: track.artist,
            song: track.name,
            cover: track.image,
            rating: 10,
            review: "test",
            id: track.id,
          };
        });
        setData(tracksData);
      }
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

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div>
      <div className="searchBar">
        <select value={searchType} onChange={handleSearchTypeChange}>
          <option value="song">Song</option>
          <option value="artist">Artist</option>
        </select>
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
