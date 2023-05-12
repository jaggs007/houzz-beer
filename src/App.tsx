import { RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";
import router from "routes";

function App() {
  return (
    <div className='App text-center'>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
