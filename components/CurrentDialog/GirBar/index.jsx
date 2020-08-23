import React from "react";

import ReactGiphySearchbox from "react-giphy-searchbox";

export const GifBar = () => {
  return (
    <>
      <ReactGiphySearchbox
        apiKey="your-api-key"
        onSelect={item => console.log(item)}
        masonryConfig={[
          { columns: 2, imageWidth: 110, gutter: 5 },
          { mq: "700px", columns: 3, imageWidth: 110, gutter: 5 }
        ]}
      />
    </>
  );
};
