import React from "react";
import { Utensils, Award, Image, FileText, Play, Settings, RefreshCw } from "lucide-react";
import { useDinnerTable } from "../context/DinnerTableContext";

export default function Sidebar({ activeTab, setActiveTab, isPresenterMode, setIsPresenterMode }) {
  const { resetToSeedData, getAssetUrl } = useDinnerTable();

  const handleReset = () => {
    if (window.confirm("Reset all project updates, nominations, and photos to mock data?")) {
      resetToSeedData();
    }
  };

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
          <img src={getAssetUrl("brand/glue-crew-logo.png")} alt="Glue Crew Logo" style={{ height: "42px", objectFit: "contain", borderRadius: "8px", border: "2px solid var(--color-border-dark)" }} />
          <div>
            <h2 style={{ fontSize: "18px", color: "var(--color-mars-blue)" }}>The Glue Crew</h2>
            <p style={{ fontSize: "10px", color: "var(--color-pea)", fontWeight: 700, textTransform: "uppercase" }}>Cooking Engagement</p>
          </div>
        </div>

        {/* Navigation Group */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-muted)", letterSpacing: "1px", margin: "10px 0" }}>VIEWS</p>
          
          <button 
            className={`btn ${activeTab === "board" ? "btn-navy" : "btn-outline"}`}
            style={{ width: "100%", justifyContent: "flex-start", boxShadow: activeTab === "board" ? undefined : "none" }}
            onClick={() => { setActiveTab("board"); setIsPresenterMode(false); }}
          >
            <Utensils size={18} />
            The Menu Board
          </button>

          <button 
            className={`btn ${activeTab === "intake" ? "btn-navy" : "btn-outline"}`}
            style={{ width: "100%", justifyContent: "flex-start", boxShadow: activeTab === "intake" ? undefined : "none" }}
            onClick={() => { setActiveTab("intake"); setIsPresenterMode(false); }}
          >
            <FileText size={18} />
            Intake Forms
          </button>

          <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--color-text-muted)", letterSpacing: "1px", margin: "16px 0 10px 0" }}>PRESENTATION</p>

          <button 
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => setIsPresenterMode(true)}
          >
            <Play size={18} />
            Start Meeting
          </button>
        </nav>
      </div>

      {/* Admin Panel Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "2px solid var(--color-border)", paddingTop: "20px" }}>
        <button 
          className="btn btn-outline" 
          style={{ width: "100%", fontSize: "12px", padding: "8px 12px", display: "flex", gap: "8px", justifyContent: "center" }} 
          onClick={handleReset}
        >
          <RefreshCw size={14} />
          Reset Mock Data
        </button>
      </div>
    </aside>
  );
}
