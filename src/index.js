import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";
// import TextExpander from "./TextExpander";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="green" onSetRating={setMovieRating} />
//       <p>This movie is rated {movieRating}</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={10} size="24px" color="blue" defaultRating={5} />
    <StarRating maxRating={3} messages={["bad", "normal", "good"]} />
    <Test /> */}
  </React.StrictMode>,
);
