import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import RootLayout from "./components/layouts/RootLayout";
import Shop from "./components/pages/Shop";
import Error from "./components/pages/Error";
import About from "./components/pages/About";
import Contacts from "./components/pages/Contacts";
import Journal from "./components/pages/Journal";
import DemoPage from "./components/pages/DemoPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
