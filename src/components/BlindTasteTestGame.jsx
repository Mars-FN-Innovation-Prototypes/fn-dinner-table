import React, { useState, useEffect } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";
import { Image, HelpCircle, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export default function BlindTasteTestGame() {
  const { photos, team, getAssetUrl } = useDinnerTable();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGuess, setSelectedGuess] = useState(null); // id of choice clicked
  const [revealed, setRevealed] = useState(false);
  const [choices, setChoices] = useState([]);

  const activePhoto = photos[currentIndex];

  // Helper to get owner details
  const getOwnerDetails = (ownerId) => {
    return team.find(m => m.id === ownerId) || { name: "Unknown", avatar: "/avatars/avatar_1.png" };
  };

  // Generate 4 multiple choice options (the owner + 3 random other team members)
  const generateChoices = () => {
    if (!activePhoto) return;
    const correctOwner = getOwnerDetails(activePhoto.ownerId);
    
    // Filter out the correct owner and get all other team members
    const otherMembers = team.filter(m => m.id !== correctOwner.id);
    
    // Shuffle and pick 3 other members
    const shuffledOthers = [...otherMembers].sort(() => 0.5 - Math.random());
    const selectedOthers = shuffledOthers.slice(0, 3);
    
    // Combine and shuffle the 4 choices
    const combinedChoices = [correctOwner, ...selectedOthers].sort(() => 0.5 - Math.random());
    
    setChoices(combinedChoices);
  };

  // Generate choices when current photo changes
  useEffect(() => {
    generateChoices();
    setSelectedGuess(null);
    setRevealed(false);
  }, [currentIndex, photos]);

  const handleGuess = (choiceId) => {
    if (revealed) return;
    setSelectedGuess(choiceId);
    if (choiceId === activePhoto.ownerId) {
      setRevealed(true);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
    setSelectedGuess(activePhoto.ownerId);
  };

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("That's all the mystery ingredients for this month! 🍽️");
    }
  };

  if (photos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <Image size={64} style={{ color: "var(--color-water)", marginBottom: "16px" }} />
        <h3 style={{ fontSize: "24px", color: "var(--color-mars-blue)", marginBottom: "12px" }}>No Blind Taste Test Photos Yet</h3>
        <p style={{ color: "var(--color-text-secondary)" }}>Submit baby photos or mystery images in the Intake Forms tab to unlock this guessing game.</p>
      </div>
    );
  }

  const owner = getOwnerDetails(activePhoto.ownerId);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      
      {/* Game Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h3 style={{ fontSize: "24px", color: "var(--color-mars-blue)" }}>
            Blind Taste Test: Guess the Owner!
          </h3>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            Dish {currentIndex + 1} of {photos.length}
          </p>
        </div>

        <button className="btn btn-outline" style={{ fontSize: "12px", padding: "6px 12px" }} onClick={handleReveal}>
          Give Up / Reveal
        </button>
      </div>

      {/* Main Game Screen */}
      <div className="grid-3" style={{ gridTemplateColumns: "1fr", gap: "24px" }}>
        
        {/* Mystery Photo Frame */}
        <div 
          className="mars-card" 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "24px", 
            border: "3px solid var(--color-mars-blue)",
            backgroundColor: "white"
          }}
        >
          <div 
            style={{ 
              width: "280px", 
              height: "280px", 
              borderRadius: "var(--border-radius-md)", 
              border: "3px solid var(--color-mars-blue)",
              overflow: "hidden",
              marginBottom: "20px",
              position: "relative",
              backgroundColor: "var(--color-rice)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* If revealed, show the real picture. If not, we show a blurred version or a placeholder question mark overlay */}
            <img 
              src={getAssetUrl(activePhoto.imagePath)} 
              alt="Mystery Clue" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                filter: revealed ? "none" : "blur(12px) grayscale(50%)",
                transition: "filter 0.5s ease"
              }} 
            />
            
            {!revealed && (
              <div 
                style={{ 
                  position: "absolute", 
                  backgroundColor: "rgba(0, 0, 160, 0.8)", 
                  color: "white", 
                  borderRadius: "50%", 
                  width: "60px", 
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid white",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
              >
                <HelpCircle size={32} />
              </div>
            )}
          </div>

          <div style={{ textAlign: "center", width: "100%" }}>
            <p style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "var(--color-pea)", letterSpacing: "1px", marginBottom: "6px" }}>
              💡 MYSTERY CLUE
            </p>
            <blockquote style={{ fontSize: "16px", fontStyle: "italic", fontWeight: 600, color: "var(--color-mars-blue)", borderLeft: "4px solid var(--color-mars-blue)", paddingLeft: "16px", margin: "10px 0", textAlign: "left", lineHeight: "1.5" }}>
              "{activePhoto.clue}"
            </blockquote>
          </div>
        </div>

        {/* Choice Grid or Reveal Info */}
        {!revealed ? (
          <div>
            <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "12px", textTransform: "uppercase" }}>
              Whose ingredient is this?
            </p>
            <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {choices.map(choice => {
                const isWrong = selectedGuess === choice.id && choice.id !== activePhoto.ownerId;
                return (
                  <button
                    key={choice.id}
                    className="btn btn-secondary"
                    style={{
                      justifyContent: "center",
                      padding: "16px",
                      fontSize: "15px",
                      borderColor: isWrong ? "var(--color-spicy-red)" : "var(--color-mars-blue)",
                      backgroundColor: isWrong ? "#fff5f5" : "white",
                      color: isWrong ? "var(--color-spicy-red)" : "var(--color-mars-blue)",
                    }}
                    onClick={() => handleGuess(choice.id)}
                  >
                    {choice.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div 
            className="mars-card animate-reveal" 
            style={{ 
              border: "3px solid var(--color-lentil)", 
              backgroundColor: "#f5fff5", 
              boxShadow: "4px 4px 0px var(--color-lentil)",
              padding: "24px"
            }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
              <img 
                src={getAssetUrl(owner.avatar)} 
                alt={owner.name} 
                style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2px solid var(--color-lentil)", objectFit: "cover" }} 
              />
              <div>
                <span style={{ color: "var(--color-lentil)", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle size={14} /> Correct Chef!
                </span>
                <h4 style={{ color: "var(--color-lentil)", fontSize: "20px" }}>{owner.name}</h4>
                <p style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>{owner.role}</p>
              </div>
            </div>

            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-text-primary)", backgroundColor: "white", padding: "12px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
              <strong>The Backstory:</strong> {activePhoto.story}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
              {currentIndex < photos.length - 1 ? (
                <button className="btn btn-navy" onClick={handleNext}>
                  Next Dish <ArrowRight size={16} />
                </button>
              ) : (
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-lentil)" }}>
                  🎉 That's all for today!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate-reveal {
          animation: slideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}
