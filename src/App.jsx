import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Telemedicine from "./pages/Telemedicine";
import SymptomChecker from "./pages/SymptomChecker";
import SkinDiseaseAI from "./pages/SkinDiseaseAI";
import Reminders from "./pages/Reminders";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import ModernNav from "./components/ModernNav";
import Footer from "./components/Footer";
import { useEffect } from "react";

const AnimatedRoutes = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <div className="page-transition">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/telemedicine" element={<Telemedicine />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/skin-ai" element={<SkinDiseaseAI />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ModernNav />
      
      <div className="pt-20">
        <AnimatedRoutes />
      </div>

      <Footer />
    </BrowserRouter>
  );
}