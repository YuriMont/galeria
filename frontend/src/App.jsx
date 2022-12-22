import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;