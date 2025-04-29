import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Resizable } from "re-resizable";
import errorImg from "../imgs/player1.png";
import "../css/player.css";
/* https://www.youtube.com/watch?v=VGSFKeGFWEA -> Youtube video for testing */
//style snippet from npm: re-resizable demo showcase, altered for studyspace | might use basic error handling learned from react-hook-form

const Player = () => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(false);
  const handleError = (e) => {
    //console.log("print from handleError", e);
    setError(true);
  };
  return (
    <Resizable
      className="main-container"
      defaultSize={{
        width: 350,
        height: 300,
      }}
      style={{ marginBottom: "2rem" }}
    >
      <div className="player-container">
        <div className="player-header">
          <h6>Media Player</h6>
        </div>
        <div className="player-cmp">
          {error ? (
            <img
              src={errorImg}
              alt="errorImage"
              objectFit="fill"
              width="100%"
              height="163px"
              position="absolute"
            />
          ) : (
            url && (
              <ReactPlayer
                url={url}
                onError={(e) => handleError(e)}
                width="100%"
                height="100%"
                controls={true}
              />
            )
          )}
        </div>
        <div className="url-box">
          <input
            type="text"
            placeholder="Insert a Youtube, Twitch, or Soundcloud Link!"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setError(false);
            }}
          />
        </div>
      </div>
    </Resizable>
  );
};

export default Player;
