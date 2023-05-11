import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Beers from "./components/Beers";
import CustomBeers from "./components/CustomBeers";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route>
              <Route path="/" element={<Beers />} />
              <Route path="all-beers" element={<Beers />} />
              <Route path="custom-beers" element={<CustomBeers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
