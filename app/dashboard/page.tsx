"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Statically import critical components like Sidebar for immediate rendering
import Sidebar from "../sidebar/page";

// Dynamically import dashboards based on role
const SuperAdminDashboard = dynamic(() => import("./screens/superadmin"), { ssr: false });
const EmployeeDashboard = dynamic(() => import("./screens/employee"), { ssr: false });
const HrDashboard = dynamic(() => import("./screens/hr"), { ssr: false });
const ManagerDashboard = dynamic(() => import("./screens/manager"), { ssr: false });
const RecruiterDashboard = dynamic(() => import("./screens/recruiter"), { ssr: false });
const TimecoordinatorDashboard = dynamic(() => import("./screens/timecoordinator"), { ssr: false });
const SalesManagerDashboard = dynamic(() => import("./screens/salesManager"), { ssr: false });

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);

  // Fetch user role from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("Role");
      setRole(userRole);
    }
  }, []);

  // Dynamically render the appropriate dashboard based on the role
  const renderDashboard = () => {
    switch (role) {
      case "SA":
        return <SuperAdminDashboard />;
      case "HR":
        return <HrDashboard />;
      case "M":
        return <ManagerDashboard />;
      case "E":
        return <EmployeeDashboard />;
      case "R":
        return <RecruiterDashboard />;
      case "TC":
        return <TimecoordinatorDashboard />;
      case "SM":
        return <SalesManagerDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <Sidebar>
      {renderDashboard()}
    </Sidebar>
  );
};

export default Dashboard;
