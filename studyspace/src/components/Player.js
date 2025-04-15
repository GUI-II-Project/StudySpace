import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Resizable } from "re-resizable";
import "../css/player.css";
/* https://www.youtube.com/watch?v=VGSFKeGFWEA -> Youtube video for testing */
//style snippet from npm: re-resizable demo showcase, altered for studyspace | might use basic error handling learned from react-hook-form

const Player = () => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState("");
  const checkLink = (link) => {
    try {
      new URL(link);
      return true;
    } catch (error) {
      return false;
    }
  };
  const linkHandle = (e) => {
    if (e.target.value && !checkLink(e.target.value)) {
      setError("Please try again with a valid link.");
    } else {
      setError("");
    }
    setUrl(e.target.value);
  };
  return (
    <Resizable
      className="main-container"
      defaultSize={{
        width: 350,
        height: 350,
      }}
    >
      <div className="player-container">
        <div className="player-header">
          <h6>Media</h6>
        </div>
        {error && <p>{error}</p>}
        <div className="player-cmp" style={{}}>
          {url && (
            <ReactPlayer url={url} width="100%" height="100%" controls={true} />
          )}
        </div>
        <div className="url-box">
          <input
            type="text"
            placeholder="Insert Youtube, Soundcloud, or Twitch Link!"
            value={url}
            onChange={linkHandle}
          />
        </div>
      </div>
    </Resizable>
  );
};

export default Player;
