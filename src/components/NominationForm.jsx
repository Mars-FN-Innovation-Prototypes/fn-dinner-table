import React, { useState } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";

export default function NominationForm() {
  const { team, addNomination } = useDinnerTable();
  const [formData, setFormData] = useState({
    nomineeId: "",
    nominator: "",
    tag: "Secret Sauce",
    reason: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nomineeId || !formData.nominator || !formData.reason) {
      alert("Please fill in all fields.");
      return;
    }

    addNomination({
      nomineeId: parseInt(formData.nomineeId),
      nominator: formData.nominator,
      tag: formData.tag,
      reason: formData.reason
    });

    setSuccess(true);
    setFormData({
      nomineeId: "",
      nominator: "",
      tag: "Secret Sauce",
      reason: ""
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mars-card" style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--color-mars-blue)" }}>
        Nominate Guest of Honor (Person of the Month)
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Nominee */}
          <div className="form-group">
            <label className="form-label">Nominate Team Member</label>
            <select 
              className="form-select"
              value={formData.nomineeId}
              onChange={(e) => setFormData({ ...formData, nomineeId: e.target.value })}
              required
            >
              <option value="">Select Nominee...</option>
              {team.map((member) => (
                <option key={member.id} value={member.id}>{member.name} ({member.role})</option>
              ))}
            </select>
          </div>

          {/* Nominator */}
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., Jessica Taylor" 
              value={formData.nominator}
              onChange={(e) => setFormData({ ...formData, nominator: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: "1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Tag */}
          <div className="form-group">
            <label className="form-label">Key Contribution Category</label>
            <select 
              className="form-select"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            >
              <option value="Secret Sauce">🥫 Secret Sauce (Innovation & Creativity)</option>
              <option value="Stretching the Dough">🍞 Stretching the Dough (Extra Effort / Dedication)</option>
              <option value="Putting out Fires">🧯 Putting out Fires (Problem Solving under pressure)</option>
              <option value="Kitchen Helper">🤝 Kitchen Helper (Outstanding Team Player / Collaboration)</option>
            </select>
          </div>

          {/* Reason */}
          <div className="form-group">
            <label className="form-label">Why do they deserve this honor?</label>
            <textarea 
              className="form-textarea" 
              rows="4"
              placeholder="Share details of their outstanding work this month..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="submit" className="btn btn-navy">
            Submit Nomination
          </button>
          
          {success && (
            <span style={{ color: "var(--color-pea)", fontWeight: 700 }}>
              ✓ Nomination submitted!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
