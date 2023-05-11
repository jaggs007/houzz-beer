import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { Container } from "react-bootstrap";
import router from "./routes";

function App() {
  return (
    <div className='App'>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
