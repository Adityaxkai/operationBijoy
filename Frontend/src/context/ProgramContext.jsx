import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ProgramContext = createContext();

// Define the Provider component
function ProgramProvider({ children }) {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('programs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('programs', JSON.stringify(programs));
  }, [programs]);

  const addProgram = (program) => {
    setPrograms((prev) => [...prev, program]);
  };

  const deleteProgram = (index) => {
    setPrograms((prev) => prev.filter((_, i) => i !== index));
  };

  const value = { programs, addProgram, deleteProgram };

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
}

// Define the custom hook separately
function usePrograms() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramProvider');
  }
  return context;
}

// Export as named exports (recommended by Vite)
export { ProgramProvider, usePrograms };
