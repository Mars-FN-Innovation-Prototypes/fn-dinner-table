import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MenuBoard from "./components/MenuBoard";
import ProjectForm from "./components/ProjectForm";
import NominationForm from "./components/NominationForm";
import PhotoUpload from "./components/PhotoUpload";
import Slideshow from "./pages/Slideshow";
import { DinnerTableProvider } from "./context/DinnerTableContext";
import { Coffee, ClipboardList, Award, Camera } from "lucide-react";

function MainAppContent() {
  const [activeTab, setActiveTab] = useState("board"); // board, intake
  const [intakeSubTab, setIntakeSubTab] = useState("project"); // project, nomination, photo
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  const renderTabContent = () => {
    if (activeTab === "board") {
      return <MenuBoard />;
    }

    if (activeTab === "intake") {
      return (
        <div>
          {/* Intake Header */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", color: "var(--color-mars-blue)", fontFamily: "'Outfit', sans-serif" }}>Intake & Submission Portal</h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Add items to prepare for the upcoming team meeting</p>
          </div>

          {/* Sub-tabs Selection */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <button 
              className={`btn ${intakeSubTab === "project" ? "btn-navy" : "btn-secondary"}`}
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setIntakeSubTab("project")}
            >
              <ClipboardList size={16} />
              Project Update
            </button>
            
            <button 
              className={`btn ${intakeSubTab === "nomination" ? "btn-navy" : "btn-secondary"}`}
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setIntakeSubTab("nomination")}
            >
              <Award size={16} />
              Nominate Guest
            </button>
            
            <button 
              className={`btn ${intakeSubTab === "photo" ? "btn-navy" : "btn-secondary"}`}
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setIntakeSubTab("photo")}
            >
              <Camera size={16} />
              Blind Taste Photo
            </button>
          </div>

          {/* Sub-tab form display */}
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            {intakeSubTab === "project" && <ProjectForm />}
            {intakeSubTab === "nomination" && <NominationForm />}
            {intakeSubTab === "photo" && <PhotoUpload />}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {isPresenterMode ? (
        <Slideshow onClose={() => setIsPresenterMode(false)} />
      ) : (
        <div className="app-container">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isPresenterMode={isPresenterMode}
            setIsPresenterMode={setIsPresenterMode}
          />
          <main className="main-content">
            {renderTabContent()}
          </main>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <DinnerTableProvider>
      <MainAppContent />
    </DinnerTableProvider>
  );
}
