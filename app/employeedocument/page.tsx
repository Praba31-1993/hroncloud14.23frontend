"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Colors } from "@/app/reusableComponent/styles";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function EmployeeDocument() {
  const [selectedTab, setSelectedTab] = useState<string>("Employee Document");
  const [employeeId, setEmployeeId] = useState<string>("");
  const useColors = Colors();

  const [role, setRole] = useState<string | null>(null);

  // ✅ Dynamic Imports for Lazy Loading
  const EmployeeDocumentTable = dynamic(
    () => import("./components/employeedocumenttable"),
    {
      loading: () => <p>Loading Employee Documents...</p>,
      ssr: false,
    }
  );
  const Sidebar = dynamic(() => import("../sidebar/page"), { ssr: false });

  const ViewEmployeeDocument = dynamic(
    () => import("./components/viewemployeedocument"),
    {
      loading: () => <p>Loading Document...</p>,
      ssr: false,
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);

  return (
    <div>
      <Sidebar>
        <div className="container-fluid">
          {employeeId !== "" && (
            <button
              onClick={() => setEmployeeId("")}
              className="para textheader"
            >
              <ArrowBackOutlinedIcon className="mr-1" />
              Back
            </button>
          )}
          <div className="row">
            <div className="col-6 p-0">
              <p className="textheader heading my-2">
                {employeeId === ""
                  ? "Employee Document"
                  : "Employee document submission"}
              </p>
            </div>
          </div>
        </div>

        {employeeId === "" ? (
          <EmployeeDocumentTable
            getEmployeeDetails={(data: string) => setEmployeeId(data)}
          />
        ) : (
          <ViewEmployeeDocument employeeId={employeeId} />
        )}
      </Sidebar>
    </div>
  );
}

export default EmployeeDocument;
