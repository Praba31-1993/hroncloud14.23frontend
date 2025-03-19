"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { approverrepots } from "../../reusableComponent/JsonData";
import { Colors } from "@/app/reusableComponent/styles";
import Sidebar from "@/app/sidebar/page";
import DropdownComponent from "@/app/reusableComponent/dropdown";

// ⏬ Dynamic Imports (SSR Disabled for Client-Only Components)
const Punchinoutapprover = dynamic(() => import("./components/punchinoutapprover"), { ssr: false });
// Static Import for frequently used components


function Approver() {
  const useColors = Colors();
  const [role, setRole] = useState<string | null>(null);
  const [selectedTimeOff, setSelectedTimeOff] = useState("");

  // ✅ Use `useEffect` for accessing localStorage safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = window.localStorage.getItem("Role");
      setRole(storedRole || null);
    }
  }, []);

  return (
    <div>
      <Sidebar>
        <div className="row">
          <div className="col-6">
            <p className="textheader heading my-2">Approver report</p>
          </div>
          <div className="col-6 text-end">
            <DropdownComponent
              dropdownlist={approverrepots}
              color={useColors.themeRed}
              selectedDatafunction={(data: any) => setSelectedTimeOff(data)}
            />
          </div>
          <div>
            <Punchinoutapprover />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Approver;
