import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Resizable } from "re-resizable";
/* https://www.youtube.com/watch?v=VGSFKeGFWEA -> Youtube video for testing*/

//style snippet from npm: re-resizable demo showcase, altered for studyspace.

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  background: "#212B58",
};

const Player = () => {
  const [url, setUrl] = useState(null);
  return (
    <Resizable
      style={style}
      defaultSize={{
        width: 400,
        height: 300,
      }}
    >
      <div class="card-body">
        <h5 class="card-title text-white" style={{ padding: "10px" }}>
          Media
        </h5>
        <div style={{}}>
          {url && (
            <ReactPlayer
              url={url}
              width="400px"
              height="200px"
              padding="15px"
              controls={true}
            />
          )}
        </div>
        <input
          type="text"
          placeholder="Insert URL here."
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
    </Resizable>
  );
};

export default Player;
