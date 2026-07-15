import React, { useState } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";

export default function ProjectForm() {
  const { team, addProject } = useDinnerTable();
  const [stage, setStage] = useState("counter"); // counter, oven, stove
  const [formData, setFormData] = useState({
    name: "",
    leadId: "",
    ingredients: "",
    prepTime: "",
    status: "Normal",
    eta: "",
    review: "",
    link: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.leadId) {
      alert("Please fill in Project Name and select a Lead.");
      return;
    }

    const payload = {
      name: formData.name,
      leadId: parseInt(formData.leadId),
      stage: stage
    };

    if (stage === "counter") {
      payload.details = "Gathering ingredients & preparing for takeoff.";
      payload.ingredients = formData.ingredients;
      payload.prepTime = formData.prepTime || "TBD";
    } else if (stage === "oven") {
      payload.details = "Actively baking. Development is in full swing.";
      payload.status = formData.status;
      payload.eta = formData.eta || "TBD";
    } else if (stage === "stove") {
      payload.details = "Served and plated! Fully live.";
      payload.review = formData.review;
      payload.link = formData.link;
    }

    addProject(payload);
    setSuccess(true);
    setFormData({
      name: "",
      leadId: "",
      ingredients: "",
      prepTime: "",
      status: "Normal",
      eta: "",
      review: "",
      link: ""
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mars-card" style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--color-mars-blue)" }}>
        Submit Project Update
      </h3>

      {/* Stage Selector Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "2px solid var(--color-border)", paddingBottom: "12px" }}>
        <button 
          type="button"
          className={`btn ${stage === "counter" ? "btn-primary" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "12px", boxShadow: stage === "counter" ? undefined : "none" }}
          onClick={() => setStage("counter")}
        >
          🍳 On the Counter
        </button>
        <button 
          type="button"
          className={`btn ${stage === "oven" ? "btn-orange" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "12px", boxShadow: stage === "oven" ? undefined : "none" }}
          onClick={() => setStage("oven")}
        >
          🔥 In the Oven
        </button>
        <button 
          type="button"
          className={`btn ${stage === "stove" ? "btn-navy" : "btn-outline"}`}
          style={{ padding: "8px 16px", fontSize: "12px", boxShadow: stage === "stove" ? undefined : "none" }}
          onClick={() => setStage("stove")}
        >
          🍽️ Out of the Stove
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Project Name */}
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., Smart Inventory v2" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Project Lead */}
          <div className="form-group">
            <label className="form-label">Project Lead</label>
            <select 
              className="form-select"
              value={formData.leadId}
              onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
              required
            >
              <option value="">Select Lead...</option>
              {team.map((member) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stage-Specific Fields */}
        {stage === "counter" && (
          <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Ingredients Needed / Blockers</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="What resources, access, or dependencies are needed to kick this off?"
                value={formData.ingredients}
                onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Prep Time (Expected Start/Timeline)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g., Starting next week / 2 weeks prep" 
                value={formData.prepTime}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
              />
            </div>
          </div>
        )}

        {stage === "oven" && (
          <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group">
              <label className="form-label">Baking Temperature (Status)</label>
              <select 
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Normal">🟢 Normal (Cooking smoothly)</option>
                <option value="Warm">🟡 Warm (Minor hiccups)</option>
                <option value="Burning/Blocked">🔴 Burning/Blocked (Needs fire extinguisher!)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Time to Plate (ETA)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g., July 20 / End of sprint" 
                value={formData.eta}
                onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
              />
            </div>
          </div>
        )}

        {stage === "stove" && (
          <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">The Review (Success Metric / Achievements)</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="How did it go? What value does it bring to Mars Food & Nutrition?"
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label className="form-label">Live Output Link / URL (Optional)</label>
              <input 
                type="url" 
                className="form-input" 
                placeholder="https://dashboard.mars.com" 
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="submit" className="btn btn-navy">
            Add to Menu
          </button>
          
          {success && (
            <span style={{ color: "var(--color-pea)", fontWeight: 700, animation: "pulse 1s" }}>
              ✓ Placed on the Board!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
