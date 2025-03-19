"use client";
import React, { useState, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Sidebar from "../sidebar/page"; // Keep SSR if possible
import DropdownComponent from "../reusableComponent/dropdown"; // Keep SSR if possible

// Dynamically load components only when needed
const CreateProject = dynamic(() => import("./components/createProject"), { 
  ssr: false,
  loading: () => <p>Loading...</p> 
});
const ProjectHistory = dynamic(() => import("./components/projecthistory"), { 
  ssr: false,
  loading: () => <p>Loading...</p> 
});

function ProjectStatus() {
  const [selectedTab, setSelectedTab] = useState<string>("New Project");
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element | null>(null); // New state to manage selected component
  const role: string = useSelector((state: RootState) => state.role.role);

  const tabs = [
    { id: 1, label: "New Project" },
    { id: 2, label: "Project History" },
  ];

  // UseEffect to manage component rendering based on selected tab
  useEffect(() => {
    console.log("selectedTab",selectedTab)
    // Based on the selected tab, update the selectedComponent state
    if (selectedTab === "New Project") {
      setSelectedComponent(<CreateProject />);
    } else {
      setSelectedComponent(<ProjectHistory />);
    }
  }, [selectedTab]); // Runs when selectedTab changes

  return (
    <div>
      <Sidebar>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 p-0">
              <p className="textheader heading my-2">Project Status</p>
            </div>

            <div className="col-6 text-end mb-3">
              <DropdownComponent
                dropdownlist={tabs}
                selectedDatafunction={(data: string) => setSelectedTab(data)}
              />
            </div>
          </div>
        </div>

        {/* Wrap in Suspense for smoother loading */}
        <Suspense fallback={<p>Loading project...</p>}>
          {selectedComponent} {/* Render the component based on selectedTab */}
        </Suspense>
      </Sidebar>
    </div>
  );
}

export default ProjectStatus;
