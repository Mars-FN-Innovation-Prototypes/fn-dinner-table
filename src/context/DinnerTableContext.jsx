import React, { createContext, useContext, useState, useEffect } from "react";

const DinnerTableContext = createContext();

export const TEAM_MEMBERS = [
  { id: 1, name: "Anne", role: "VP, Digital Transformation", avatar: "/avatars/Anne.png" },
  { id: 2, name: "Asia", role: "Senior Digital Analyst", avatar: "/avatars/Asia.png" },
  { id: 3, name: "Balki", role: "Lead Data Scientist", avatar: "/avatars/Balki.png" },
  { id: 4, name: "Deepak", role: "Principal Architect", avatar: "/avatars/Deepak.png" },
  { id: 5, name: "Emily", role: "Lead UX Designer", avatar: "/avatars/Emily.png" },
  { id: 6, name: "Fran", role: "Director, F&N Logistics", avatar: "/avatars/Fran.png" },
  { id: 7, name: "Lucie", role: "Project Manager", avatar: "/avatars/Lucie.png" },
  { id: 8, name: "Mike", role: "Full-Stack Developer", avatar: "/avatars/Mike.png" },
  { id: 9, name: "Kishore", role: "DevOps Lead", avatar: "/avatars/Kishore.png" },
  { id: 10, name: "Nava", role: "Solutions Engineer", avatar: "/avatars/Nava.png" },
  { id: 11, name: "Saima", role: "Data Engineer", avatar: "/avatars/Saima.png" },
  { id: 12, name: "Rajib", role: "AI Research Scientist", avatar: "/avatars/Rajib.png" },
  { id: 13, name: "Monia", role: "Product Manager", avatar: "/avatars/Monia.png" },
  { id: 14, name: "Paul", role: "Director, Nutrition Insights", avatar: "/avatars/Paul.png" },
  { id: 15, name: "Scott", role: "Senior Developer", avatar: "/avatars/Scott.png" },
  { id: 16, name: "JJ", role: "Lead Analytics Translator", avatar: "/avatars/JJ.png" }
];

const INITIAL_PROJECTS = [
  {
    id: "p1",
    name: "Automated Recipe Scraper & Tagging Engine",
    leadId: 3,
    stage: "counter",
    details: "Scraping internal recipe vaults to tag nutritional profiles automatically.",
    ingredients: "Data engineering support for database connections.",
    prepTime: "2 weeks"
  },
  {
    id: "p2",
    name: "F&N Generative Menu Builder v2",
    leadId: 12,
    stage: "oven",
    details: "AI recommendation engine suggesting meal templates for schools.",
    status: "Warm",
    eta: "July 24"
  },
  {
    id: "p3",
    name: "Smart Inventory Forecast dashboard",
    leadId: 6,
    stage: "stove",
    details: "Predictive replenishment dashboard deployed for regional warehouses.",
    review: "Reduced wastage by 14% and improved lead-times.",
    link: "https://inventory-predict.mars.com"
  }
];

const INITIAL_NOMINATIONS = [
  {
    id: "n1",
    nomineeId: 8,
    nominator: "Emily",
    tag: "Secret Sauce",
    reason: "Mike stayed up late to fix the deployment pipeline issues, ensuring the client dashboard was ready for the demo."
  },
  {
    id: "n2",
    nomineeId: 11,
    nominator: "Balki",
    tag: "Putting out Fires",
    reason: "Saima resolved a major database locking bug that had been stalling training jobs for the research team."
  }
];

const INITIAL_PHOTOS = [
  {
    id: "ph1",
    ownerId: 3,
    imagePath: "/avatars/Balki.png",
    clue: "I have visited 42 countries and still cannot speak a second language.",
    story: "My parents traveled a lot for work, so I was born in London, lived in Tokyo, and went to high school in Paris, but I only speak English!"
  },
  {
    id: "ph2",
    ownerId: 5,
    imagePath: "/avatars/Emily.png",
    clue: "My favorite pet is a bearded dragon named Pancake.",
    story: "Pancake sits on my shoulder while I write design docs in Figma. He's a very peaceful reviewer!"
  }
];

export function DinnerTableProvider({ children }) {
  const CURRENT_VERSION = "v2_named_avatars";
  
  const checkMigration = () => {
    const savedVersion = localStorage.getItem("dt_db_version");
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.removeItem("dt_projects");
      localStorage.removeItem("dt_nominations");
      localStorage.removeItem("dt_photos");
      localStorage.setItem("dt_db_version", CURRENT_VERSION);
    }
  };

  const [projects, setProjects] = useState(() => {
    checkMigration();
    const saved = localStorage.getItem("dt_projects");
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [nominations, setNominations] = useState(() => {
    const saved = localStorage.getItem("dt_nominations");
    return saved ? JSON.parse(saved) : INITIAL_NOMINATIONS;
  });

  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem("dt_photos");
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  useEffect(() => {
    localStorage.setItem("dt_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("dt_nominations", JSON.stringify(nominations));
  }, [nominations]);

  useEffect(() => {
    localStorage.setItem("dt_photos", JSON.stringify(photos));
  }, [photos]);

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: `p_${Date.now()}` }]);
  };

  const addNomination = (nomination) => {
    setNominations(prev => [...prev, { ...nomination, id: `n_${Date.now()}` }]);
  };

  const addPhoto = (photo) => {
    setPhotos(prev => [...prev, { ...photo, id: `ph_${Date.now()}` }]);
  };

  const clearMeetingData = () => {
    setProjects([]);
    setNominations([]);
    setPhotos([]);
  };

  const resetToSeedData = () => {
    setProjects(INITIAL_PROJECTS);
    setNominations(INITIAL_NOMINATIONS);
    setPhotos(INITIAL_PHOTOS);
  };

  return (
    <DinnerTableContext.Provider value={{
      projects,
      nominations,
      photos,
      team: TEAM_MEMBERS,
      addProject,
      addNomination,
      addPhoto,
      clearMeetingData,
      resetToSeedData
    }}>
      {children}
    </DinnerTableContext.Provider>
  );
}

export function useDinnerTable() {
  return useContext(DinnerTableContext);
}
