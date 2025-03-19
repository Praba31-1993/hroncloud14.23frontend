"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import DropdownComponent from "../reusableComponent/dropdown";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Colors } from "@/app/reusableComponent/styles";

// Dynamic imports for better performance
const CreateProject = dynamic(() => import("./components/createProject"), {
  loading: () => <p>Loading...</p>, // Optional loading state
  ssr: false, // Disable server-side rendering if needed
});
const ProjectHistory = dynamic(() => import("./components/projecthistory"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
 const Sidebar = dynamic(() => import("../sidebar/page"), {
    ssr: false,
  });

function ProjectStatus() {
  const [selectedTab, setSelectedTab] = useState<string>("New Project");
  const role: string = useSelector((state: RootState) => state.role.role);
  const useColors = Colors();

  const tabs = [
    { id: 1, label: "New Project" },
    { id: 2, label: "Project History" },
  ];

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
                color={useColors.themeRed}
              />
            </div>
          </div>
        </div>

        {/* Dynamic component rendering */}
        {selectedTab === "New Project" ? <CreateProject /> : <ProjectHistory />}
      </Sidebar>
    </div>
  );
}

export default ProjectStatus;
