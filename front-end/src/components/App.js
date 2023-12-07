import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./about";
import Title from "./title";
import Feed from "./Feed";
import ProfileReview from "./ProfileReview";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Post from "./Post";
import Settings from "./Settings";
import Song from "./Song";
import Search from "./Search";
import OtherUserProfile from "./OtherUserProfile";
// import Comment from "./Comment"
import ViewFollowers from "./ViewFollowers";
import ViewFollowing from "./ViewFollowing";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfileReview />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />;
          <Route path="/post/:songArtist/:songTitle/:username" element={<Post />} />;
          <Route path="/settings" element={<Settings />} />;
          <Route path="/song/:songArtist/:songTitle" element={<Song />} />
          <Route path="/search" element={<Search />} />
          <Route path="/other-user/:userId" element={<OtherUserProfile />} />;
          <Route path="/view-followers" element={<ViewFollowers />} />;
          <Route path="/view-following" element={<ViewFollowing />} />;
          {/* <Route path="/comments/:songArtist/:songTitle/:username" element={<Comment />} />; */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
