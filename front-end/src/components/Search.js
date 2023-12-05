import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedComponent from "./FeedComponent";
import "../css/Search.css";
import Nav from './Nav';

export default function Search() {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage

  const [response, setResponse] = useState({}) // we expect the server to send us a simple object in this case
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true) // if we already have a JWT token in local storage, set this to true, otherwise false

  // try to load the protected data from the server when this component first renders
  useEffect(() => {
    // send the request to the server api, including the Authorization header with our JWT token in it
    axios
      .get(`http://localhost:3000/protected`, {
        headers: { Authorization: `JWT ${jwtToken}` }, // pass the token, if any, to the server
      })
      .then(res => {
        setResponse(res.data) // store the response data
      })
      .catch(err => {
        console.log(
          "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
        )
        setIsLoggedIn(false) // update this state variable, so the component re-renders
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
          artistName: res.artists[0].name,
          songName: res.name,
          albumCover: res.album.images[1].url,
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
            artistName: track.artist,
            songName: track.name,
            albumCover: track.image,
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
    <>
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
      <Nav isLoggedIn={isLoggedIn} />
    </>
  );
}
