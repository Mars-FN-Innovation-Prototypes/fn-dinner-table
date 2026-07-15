import React, { useState } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";
import { MessageSquare, AlertTriangle, PlayCircle, ExternalLink, Clipboard, Check } from "lucide-react";

export default function MenuBoard() {
  const { projects, team, getAssetUrl } = useDinnerTable();
  const [copied, setCopied] = useState(false);

  // Find who has NOT submitted an update yet
  const findNudgeTargets = () => {
    const leadsWithUpdates = new Set(projects.map(p => p.leadId));
    const pendingLeads = team.filter(m => !leadsWithUpdates.has(m.id));
    return pendingLeads;
  };

  const handleCopyNudge = () => {
    const pending = findNudgeTargets();
    if (pending.length === 0) {
      alert("Everyone has submitted their updates! 🎉");
      return;
    }

    const namesList = pending.map(m => `@${m.name}`).join(", ");
    const message = `📢 **F&N DT Team Meeting Reminder** \nHi ${namesList}! Just a quick nudge to get your project updates submitted onto **The Dinner Table** board before our upcoming meeting. \n\nSubmit here: [The Dinner Table Portal](http://localhost:5173/)`;
    
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const getLeadDetails = (leadId) => {
    return team.find(m => m.id === leadId) || { name: "Unknown Lead", role: "", avatar: "/avatars/avatar_1.png" };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Normal": return "var(--color-pea)";
      case "Warm": return "var(--color-orange)";
      case "Burning/Blocked": return "var(--color-spicy-red)";
      default: return "var(--color-text-muted)";
    }
  };

  const counterProjects = projects.filter(p => p.stage === "counter");
  const ovenProjects = projects.filter(p => p.stage === "oven");
  const stoveProjects = projects.filter(p => p.stage === "stove");

  return (
    <div>
      {/* Header Panel */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 style={{ fontSize: "28px", color: "var(--color-mars-blue)", fontFamily: "'Outfit', sans-serif" }}>Today's Menu Specials</h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Visual overview of our team's active projects</p>
        </div>

        <button className="btn btn-navy" onClick={handleCopyNudge}>
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
          {copied ? "Nudge Copied!" : "Copy Teams Nudge"}
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid-3" style={{ alignItems: "flex-start" }}>
        {/* Column 1: On the Counter */}
        <div className="mars-card" style={{ borderTop: "6px solid var(--color-pea)", padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "18px", color: "var(--color-mars-blue)" }}>🍳 On the Counter</h4>
            <span className="badge badge-counter">{counterProjects.length} Prep</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {counterProjects.length === 0 ? (
              <p style={{ color: "var(--color-text-muted)", fontSize: "13px", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No items preping...</p>
            ) : (
              counterProjects.map(p => {
                const lead = getLeadDetails(p.leadId);
                return (
                  <div key={p.id} className="mars-card" style={{ padding: "14px", border: "2px solid var(--color-border-dark)", boxShadow: "2px 2px 0px var(--color-mars-blue)" }}>
                    <h5 style={{ fontSize: "15px", marginBottom: "10px", color: "var(--color-mars-blue)" }}>{p.name}</h5>
                    
                    <p style={{ fontSize: "13px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
                      <strong>Prep Time:</strong> {p.prepTime}
                    </p>
                    {p.ingredients && (
                      <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", backgroundColor: "#f0f4f8", padding: "8px", borderRadius: "4px", marginBottom: "12px", borderLeft: "3px solid var(--color-pea)" }}>
                        <strong>Ingredients:</strong> {p.ingredients}
                      </p>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid var(--color-border)", paddingTop: "10px" }}>
                      <img src={getAssetUrl(lead.avatar)} alt={lead.name} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--color-mars-blue)" }} />
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-primary)" }}>{lead.name}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 2: In the Oven */}
        <div className="mars-card" style={{ borderTop: "6px solid var(--color-orange)", padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "18px", color: "var(--color-mars-blue)" }}>🔥 In the Oven</h4>
            <span className="badge badge-oven">{ovenProjects.length} Baking</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {ovenProjects.length === 0 ? (
              <p style={{ color: "var(--color-text-muted)", fontSize: "13px", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No projects cooking...</p>
            ) : (
              ovenProjects.map(p => {
                const lead = getLeadDetails(p.leadId);
                return (
                  <div key={p.id} className="mars-card" style={{ padding: "14px", border: "2px solid var(--color-border-dark)", boxShadow: "2px 2px 0px var(--color-mars-blue)" }}>
                    <h5 style={{ fontSize: "15px", marginBottom: "10px", color: "var(--color-mars-blue)" }}>{p.name}</h5>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: getStatusColor(p.status) }} />
                        <strong>{p.status}</strong>
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>ETA: {p.eta}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid var(--color-border)", paddingTop: "10px" }}>
                      <img src={getAssetUrl(lead.avatar)} alt={lead.name} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--color-mars-blue)" }} />
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-primary)" }}>{lead.name}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Column 3: Out of the Stove */}
        <div className="mars-card" style={{ borderTop: "6px solid var(--color-lentil)", padding: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h4 style={{ fontSize: "18px", color: "var(--color-mars-blue)" }}>🍽️ Out of the Stove</h4>
            <span className="badge badge-stove">{stoveProjects.length} Served</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {stoveProjects.length === 0 ? (
              <p style={{ color: "var(--color-text-muted)", fontSize: "13px", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>No dishes plated...</p>
            ) : (
              stoveProjects.map(p => {
                const lead = getLeadDetails(p.leadId);
                return (
                  <div key={p.id} className="mars-card" style={{ padding: "14px", border: "2px solid var(--color-border-dark)", boxShadow: "2px 2px 0px var(--color-mars-blue)" }}>
                    <h5 style={{ fontSize: "15px", marginBottom: "10px", color: "var(--color-mars-blue)" }}>{p.name}</h5>
                    
                    {p.review && (
                      <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginBottom: "10px", backgroundColor: "#f6fff6", padding: "8px", borderRadius: "4px", borderLeft: "3px solid var(--color-lentil)" }}>
                        <strong>Review:</strong> {p.review}
                      </p>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img src={getAssetUrl(lead.avatar)} alt={lead.name} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--color-mars-blue)" }} />
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--color-text-primary)" }}>{lead.name}</span>
                      </div>
                      
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--color-water)", fontWeight: 700, textDecoration: "none" }}>
                          Link <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
