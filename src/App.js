import Axios from "axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./App.css";

function App() {
  const url =
    "https://api.unsplash.com/photos?client_id=Z_69_0zSzE1gW7TEU2qQpgS3Kvtqfny1Ej-dll1I998";
  const [state, setState] = useState({ images: null });

  const getImage = async () => {
    await Axios.get(url).then((res) => {
      setState({ images: res.data });
    });
  };

  useEffect(() => {
    getImage();
    console.log(state.images);
  }, []);

  if (!state.images) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      {state.images.length > 0 &&
        state.images.map((item) => (
          <LazyLoadImage
            effect="blur"
            src={item.urls.regular}
            alt={item.alt_description}
            key={item.id}
            height="500px"
            width="400px"
            placeholderSrc={process.env.PUBLIC_URL + "/logo192.png"}
          />
        ))}
    </div>
  );
}

export default App;
