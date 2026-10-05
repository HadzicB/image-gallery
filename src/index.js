import ReactDOM from "react-dom/client";

import App from "./ImageGallery";
import images from "./images";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App images={images} />,
);
