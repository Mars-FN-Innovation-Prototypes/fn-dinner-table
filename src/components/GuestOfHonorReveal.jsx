import React, { useState, useEffect } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";
import { Award, Heart } from "lucide-react";

export default function GuestOfHonorReveal() {
  const { nominations, team, getAssetUrl } = useDinnerTable();
  const [selectedNomineeId, setSelectedNomineeId] = useState("");
  const [isLifted, setIsLifted] = useState(false);
  const [confetti, setConfetti] = useState([]);
  
  // Aggregate nominations by nominee
  const nomineeAggregates = nominations.reduce((acc, nom) => {
    if (!acc[nom.nomineeId]) {
      acc[nom.nomineeId] = {
        member: team.find(m => m.id === nom.nomineeId),
        nominations: []
      };
    }
    acc[nom.nomineeId].nominations.push(nom);
    return acc;
  }, {});

  const nomineesList = Object.values(nomineeAggregates);

  // Set initial nominee if available
  useEffect(() => {
    if (nomineesList.length > 0 && !selectedNomineeId) {
      setSelectedNomineeId(nomineesList[0].member.id.toString());
    }
  }, [nomineesList, selectedNomineeId]);

  const activeNomineeData = nomineeAggregates[selectedNomineeId];

  // Trigger confetti particle generation when lifted
  const triggerConfetti = () => {
    const particles = [];
    const colors = ["#62BB46", "#FFD131", "#EB6916", "#0000A0", "#EB5F87", "#B4CE00"];
    
    for (let i = 0; i < 60; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100 + "%",
        top: -20 - Math.random() * 50 + "px",
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2 + "s",
        duration: 2 + Math.random() * 2 + "s",
        size: 5 + Math.random() * 10 + "px"
      });
    }
    setConfetti(particles);
  };

  const handleReveal = () => {
    if (!activeNomineeData) return;
    setIsLifted(true);
    triggerConfetti();
  };

  const handleResetCloche = (newId) => {
    setIsLifted(false);
    setConfetti([]);
    setSelectedNomineeId(newId);
  };

  if (nomineesList.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <Award size={64} style={{ color: "var(--color-orange)", marginBottom: "16px" }} />
        <h3 style={{ fontSize: "24px", color: "var(--color-mars-blue)", marginBottom: "12px" }}>No Guest of Honor Nominations Yet</h3>
        <p style={{ color: "var(--color-text-secondary)" }}>Submit nominations in the Intake Forms tab to unlock this reveal screen.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
      {/* Selector dropdown for presenter */}
      {!isLifted && nomineesList.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-text-secondary)" }}>Select Nominee to Reveal:</span>
          <select 
            className="form-select" 
            style={{ width: "200px", padding: "6px 12px" }}
            value={selectedNomineeId}
            onChange={(e) => handleResetCloche(e.target.value)}
          >
            {nomineesList.map(item => (
              <option key={item.member.id} value={item.member.id}>{item.member.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Confetti Container */}
      {isLifted && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none", zIndex: 100 }}>
          {confetti.map(p => (
            <div 
              key={p.id} 
              className="confetti-particle"
              style={{
                left: p.left,
                top: p.top,
                backgroundColor: p.color,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>
      )}

      {/* Cloche Presentation Platter */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "450px" }}>
        
        {!isLifted && activeNomineeData && (
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "28px", color: "var(--color-mars-blue)", marginBottom: "10px" }}>Guest of Honor Reveal</h3>
            <p style={{ color: "var(--color-text-secondary)" }}>Click the silver cloche platter to plate the Guest of Honor!</p>
          </div>
        )}

        <div 
          className={`cloche-container ${isLifted ? "lifted" : ""}`} 
          onClick={!isLifted ? handleReveal : undefined}
          style={{ marginBottom: "40px" }}
        >
          {/* Dome */}
          <div className="cloche-dome">
            <div className="cloche-handle" />
          </div>
          {/* Platter */}
          <div className="cloche-platter" />
        </div>

        {/* Revealed Content Card */}
        {isLifted && activeNomineeData && (
          <div 
            className="mars-card" 
            style={{ 
              width: "100%", 
              animation: "slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
              textAlign: "center",
              border: "3px solid var(--color-mars-blue)",
              boxShadow: "6px 6px 0px var(--color-mars-blue)",
              backgroundColor: "white",
              padding: "36px"
            }}
          >
            <div style={{ position: "relative", display: "inline-block", marginBottom: "16px" }}>
              <img 
                src={getAssetUrl(activeNomineeData.member.avatar)} 
                alt={activeNomineeData.member.name} 
                style={{ width: "120px", height: "120px", borderRadius: "50%", border: "4px solid var(--color-mars-blue)", objectFit: "cover" }} 
              />
              <span 
                style={{ 
                  position: "absolute", 
                  bottom: "0", 
                  right: "0", 
                  backgroundColor: "var(--color-orange)", 
                  color: "white", 
                  borderRadius: "50%", 
                  padding: "8px", 
                  border: "2px solid var(--color-mars-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Award size={18} />
              </span>
            </div>

            <h2 style={{ fontSize: "28px", color: "var(--color-mars-blue)", marginBottom: "4px" }}>
              {activeNomineeData.member.name}
            </h2>
            <p style={{ color: "var(--color-pea)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>
              {activeNomineeData.member.role}
            </p>

            <h4 style={{ fontSize: "18px", color: "var(--color-mars-blue)", marginBottom: "12px", textAlign: "left", borderBottom: "2px solid var(--color-border)", paddingBottom: "8px" }}>
              🏆 Peer Praise & Citations ({activeNomineeData.nominations.length})
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
              {activeNomineeData.nominations.map(nom => (
                <div key={nom.id} style={{ backgroundColor: "var(--color-rice)", padding: "16px", borderRadius: "var(--border-radius-sm)", border: "2px solid var(--color-border-dark)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span className="badge" style={{ backgroundColor: "var(--color-white)", fontSize: "10px", color: "var(--color-mars-blue)" }}>
                      {nom.tag === "Secret Sauce" && "🥫 Secret Sauce"}
                      {nom.tag === "Stretching the Dough" && "🍞 Stretching the Dough"}
                      {nom.tag === "Putting out Fires" && "🧯 Putting out Fires"}
                      {nom.tag === "Kitchen Helper" && "🤝 Kitchen Helper"}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                      Nominated by: {nom.nominator}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", fontStyle: "italic", color: "var(--color-text-primary)", lineHeight: "1.5" }}>
                    "{nom.reason}"
                  </p>
                </div>
              ))}
            </div>

            {nomineesList.length > 1 && (
              <button 
                className="btn btn-outline" 
                style={{ marginTop: "24px" }}
                onClick={() => {
                  const currentIndex = nomineesList.findIndex(n => n.member.id === parseInt(selectedNomineeId));
                  const nextIndex = (currentIndex + 1) % nomineesList.length;
                  handleResetCloche(nomineesList[nextIndex].member.id.toString());
                }}
              >
                Reveal Next Winner
              </button>
            )}
          </div>
        )}
      </div>

      {/* Slide Animation CSS */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
