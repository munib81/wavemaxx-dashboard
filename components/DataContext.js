"use client";
// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import { getData } from "@/libs/getData"; // Ensure this path is correct

// Create a context object
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);
      try {
        const data = await getData(`components`);
        const sortedComponents = sortComponents(data);
        setComponents(sortedComponents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchComponents();
  }, []);

  const sortComponents = (data) => {
    const freeComponents = data.filter(
      (component) => component.visibility === "free"
    );
    const paidComponents = data.filter(
      (component) => component.visibility === "paid"
    );
    return [...freeComponents, ...paidComponents];
  };

  return (
    <DataContext.Provider value={{ components, loading }}>
      {children}
    </DataContext.Provider>
  );
};
