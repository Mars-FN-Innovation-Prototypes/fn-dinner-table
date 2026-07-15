import React, { useState } from "react";
import { useDinnerTable } from "../context/DinnerTableContext";

export default function PhotoUpload() {
  const { team, addPhoto } = useDinnerTable();
  const [formData, setFormData] = useState({
    ownerId: "",
    clue: "",
    story: "",
    imageUrl: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ownerId || !formData.clue || !formData.story) {
      alert("Please fill in who the photo belongs to, the clue, and the backstory.");
      return;
    }

    const selectedMember = team.find(m => m.id === parseInt(formData.ownerId));
    
    // Fallback to avatar if no image URL is provided, to simulate the uploaded picture
    const imagePath = formData.imageUrl || (selectedMember ? selectedMember.avatar : "/avatars/avatar_1.png");

    addPhoto({
      ownerId: parseInt(formData.ownerId),
      clue: formData.clue,
      story: formData.story,
      imagePath: imagePath
    });

    setSuccess(true);
    setFormData({
      ownerId: "",
      clue: "",
      story: "",
      imageUrl: ""
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="mars-card" style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "var(--color-mars-blue)" }}>
        Submit Photo of the Month (Blind Taste Test)
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Owner */}
          <div className="form-group">
            <label className="form-label">Who is in this picture?</label>
            <select 
              className="form-select"
              value={formData.ownerId}
              onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
              required
            >
              <option value="">Select Member...</option>
              {team.map((member) => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>

          {/* Image Link (Mock Upload) */}
          <div className="form-group">
            <label className="form-label">Image URL (Optional)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. https://example.com/baby-photo.jpg (or blank to use Avatar)" 
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="grid-3" style={{ gridTemplateColumns: "1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Clue */}
          <div className="form-group">
            <label className="form-label">The Clue (to help the team guess)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. I was once featured in a local TV commercial for apples." 
              value={formData.clue}
              onChange={(e) => setFormData({ ...formData, clue: e.target.value })}
              required
            />
          </div>

          {/* Story */}
          <div className="form-group">
            <label className="form-label">The Backstory (revealed after they guess)</label>
            <textarea 
              className="form-textarea" 
              rows="3"
              placeholder="Tell the story behind the clue or photo..."
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button type="submit" className="btn btn-navy">
            Add to Game Room
          </button>
          
          {success && (
            <span style={{ color: "var(--color-pea)", fontWeight: 700 }}>
              ✓ Photo added to game database!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
