import React, { useState, useEffect } from "react";
import MenuBoard from "../components/MenuBoard";
import BlindTasteTestGame from "../components/BlindTasteTestGame";
import GuestOfHonorReveal from "../components/GuestOfHonorReveal";
import { X, ChevronLeft, ChevronRight, Award, Utensils, Image as ImageIcon, Flame } from "lucide-react";
import { useDinnerTable } from "../context/DinnerTableContext";

export default function Slideshow({ onClose }) {
  const { getAssetUrl } = useDinnerTable();
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 5;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
              <img src={getAssetUrl("brand/glue-crew-logo.png")} alt="The Glue Crew Logo" style={{ height: "120px", objectFit: "contain", borderRadius: "12px", border: "3px solid var(--color-border-dark)" }} />
            </div>
            <h1 style={{ fontSize: "52px", color: "var(--color-mars-blue)", fontFamily: "'Outfit', sans-serif", marginBottom: "16px" }}>
              The Glue Crew
            </h1>
            <p style={{ color: "var(--color-pea)", fontSize: "20px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" }}>
              Cooking Engagement Team Meeting
            </p>
            
            <div className="mars-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", border: "3px solid var(--color-mars-blue)" }}>
              <h4 style={{ fontSize: "18px", color: "var(--color-mars-blue)", marginBottom: "8px" }}>Today's Agenda</h4>
              <ul style={{ listStyleType: "none", padding: 0, textAlign: "left", fontSize: "15px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><Utensils size={16} style={{ color: "var(--color-pea)" }} /> 1. The Menu (Project Updates)</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><ImageIcon size={16} style={{ color: "var(--color-water)" }} /> 2. Blind Taste Test (Mystery Photo Guessing)</li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}><Award size={16} style={{ color: "var(--color-orange)" }} /> 3. Guest of Honor (Peer Nominations Reveal)</li>
              </ul>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span className="badge badge-counter" style={{ fontSize: "11px" }}>STEP 1 OF 3</span>
            </div>
            <MenuBoard />
          </div>
        );

      case 2:
        return (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span className="badge badge-counter" style={{ fontSize: "11px", backgroundColor: "var(--color-water)", color: "white" }}>STEP 2 OF 3</span>
            </div>
            <BlindTasteTestGame />
          </div>
        );

      case 3:
        return (
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span className="badge badge-counter" style={{ fontSize: "11px", backgroundColor: "var(--color-orange)", color: "white" }}>STEP 3 OF 3</span>
            </div>
            <GuestOfHonorReveal />
          </div>
        );

      case 4:
        return (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <Award size={64} style={{ color: "var(--color-pea)", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "36px", color: "var(--color-mars-blue)", marginBottom: "16px" }}>Bon Appétit!</h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
              Thank you for sitting down at The Dinner Table today. Let's carry this energy forward as we build what's on the counter, bake what's in the oven, and serve what's on the stove.
            </p>
            <button className="btn btn-navy" onClick={onClose}>
              Return to Portal
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "var(--color-rice)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "30px 40px",
      overflowY: "auto"
    }}>
      {/* Top Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--color-border)", paddingBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Flame size={20} style={{ color: "var(--color-pea)" }} />
          <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-mars-blue)", textTransform: "uppercase", letterSpacing: "1px" }}>
            The Dinner Table Presentation
          </span>
        </div>
        
        <button 
          className="btn btn-outline"
          style={{ padding: "6px 12px", border: "2px solid var(--color-mars-blue)" }}
          onClick={onClose}
        >
          <X size={16} /> Exit [Esc]
        </button>
      </div>

      {/* Slide Canvas */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          {renderSlideContent()}
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid var(--color-border)", paddingTop: "16px" }}>
        
        {/* Prev Button */}
        <button 
          className="btn btn-secondary" 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
          style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Indicators */}
        <div style={{ display: "flex", gap: "8px" }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div 
              key={index} 
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "2px solid var(--color-mars-blue)",
                backgroundColor: currentSlide === index ? "var(--color-mars-blue)" : "transparent",
                cursor: "pointer",
                transition: "background-color 0.25s ease"
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          className="btn btn-secondary" 
          onClick={handleNext} 
          disabled={currentSlide === totalSlides - 1}
          style={{ opacity: currentSlide === totalSlides - 1 ? 0.5 : 1 }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
