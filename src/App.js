import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Cryptopage from "./pages/Cryptopage";
import Header from "./components/Header";
import { CryptoProvider } from "./context/CryptoContext";

function App() {
  return (
    <CryptoProvider>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<Cryptopage />} />
          </Routes>
        </Router>
      </div>
    </CryptoProvider>
  );
}

export default App;
