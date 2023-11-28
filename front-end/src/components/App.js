import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about";
import Title from "./title";
import HomepageFeed from "./HomepageFeed";
import LandingFeed from "./LandingFeed";
import ProfileReview from "./ProfileReview";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Nav from "./Nav";
import Post from "./Post";
import Settings from "./Settings";
import Song from "./Song";
import Search from "./Search";
import { useAuthContext } from "./AuthProvider.js";
import NotAuthNav from './NotAuthNav';
import OtherUserProfile from "./OtherUserProfile";
import Comment from "./Comment"
import Logout from "./Logout"

function App() {
  const auth = useAuthContext().auth;
  console.log(auth)
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="landing-feed" element={<LandingFeed />} />
          <Route path="/" element={<HomepageFeed />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile-review" element={auth? <ProfileReview />:<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />;
          <Route path="/post/:songArtist/:songTitle/:username" element={<Post />} />;
          <Route path="/settings" element={auth? <Settings />:<LogIn />} />;
          <Route path="/song/:songArtist/:songTitle" element={<Song />} />
          <Route path="/search" element={<Search />} />
          <Route path="/other-user/:userId" element={<OtherUserProfile />} />;
          <Route path="/comments/:songArtist/:songTitle/:username" element={<Comment />} />;
          <Route path="/logout" element={<Logout />} />
        </Routes>
        {auth? <Nav />:<NotAuthNav/>}
      </Router>
    </div>
  );
}

export default App;
