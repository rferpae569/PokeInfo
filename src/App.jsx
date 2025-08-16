import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Types from "./pages/Types";
import Gyms from "./pages/Gyms";
import Leagues from "./pages/Leagues";
import Pokedex from "./pages/Pokedex";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/types" element={<Types />} />
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}