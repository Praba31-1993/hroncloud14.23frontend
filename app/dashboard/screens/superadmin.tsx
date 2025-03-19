"use client";
import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Colors } from "../../reusableComponent/styles";
import { arrayList } from "../../reusableComponent/JsonData";
import { useDispatch } from "react-redux";

// Static imports for critical components
import ProfilesCard from "../components/profilescard";
import ListCard from "../../reusableComponent/listitems";
import Pendinginvoice from "../components/pendinginvoice";
import Menulistforbirthdayworkvacation from "../components/menulistforbirthdayworkvacation";
import BarChartComponent from "../../reusableComponent/chart/barchart";
import Salesreport from "../../reusableComponent/chart/barchart"; // Assuming you need to import this statically as well
import Vacationreport from "../components/vacationreport";

// Dynamically import non-critical components
const ToDoList = dynamic(() => import("../components/toDoList"), { ssr: false });
const Workanniversary = dynamic(() => import("../components/workanniversary"), { ssr: false });
const ProjectExtension = dynamic(() => import("../components/projectsextension"), { ssr: false });
const Openjobs = dynamic(() => import("../components/openjobs"), { ssr: false });
const Inineverify = dynamic(() => import("../components/inineverify"), { ssr: false });
const Policyprocedure = dynamic(() => import("../components/policyprocedure"), { ssr: false });
const Needhelp = dynamic(() => import("../components/needhelp"), { ssr: false });
const Prehiredashboard = dynamic(() => import("../components/prehiredashboard"), { ssr: false });
const Workforce = dynamic(() => import("../components/workforce"), { ssr: false });

const SuperAdminDashboard = () => {
    const [birthdayAnniversaryReport, setBirthdayAnniversaryReport] = useState([]);
    const useColors = Colors();

    const borderAndBoxShadowStyles = {
        border: useColors.border,
        boxShadow: useColors.boxshadow,
    };

    const dispatch = useDispatch();

    useEffect(() => {
        setBirthdayAnniversaryReport(arrayList);
        // dispatch(updateUser({ name: "Vikram", countryCode: "CAD" }));
    }, []);

    return (
        <div className="container-fluid px-lg-0 pt-3">
            <div className="row">
                {/* Static components for the main content */}
                <div className="col-12 mb-3 col-lg-8">
                    <div className="dashboardcard h-100 p-3" style={borderAndBoxShadowStyles}>
                        <ProfilesCard />
                    </div>
                </div>

                <div className="col-12 mb-3 col-lg-4 col-sm-6">
                    <div className="dashboardcard p-3 h-100" style={borderAndBoxShadowStyles}>
                        <ListCard />
                    </div>
                </div>

                <div className="col-12 mb-3 col-md-6 col-lg-5 col-xxl-5">
                    <div className="dashboardcard p-3 h-100" style={borderAndBoxShadowStyles}>
                        <Pendinginvoice />
                    </div>
                </div>

                <div className="col-12 mb-3 col-xxl-3 col-lg-4 col-md-7">
                    <div className="dashboardcard p-3 h-100" style={borderAndBoxShadowStyles}>
                        <ToDoList />
                    </div>
                </div>

                <div className="col-12 mb-3 col-xxl-4 col-lg-3 col-md-5 px-0">
                    <div className="row h-100 align-content-between">
                        <div className="col-12">
                            <div className="dashboardcard p-lg-2 p-3 p-xxl-3 mb-3" style={borderAndBoxShadowStyles}>
                                <Menulistforbirthdayworkvacation title="Upcoming birthday" headerImage="/assets/img/birthday.svg" items={birthdayAnniversaryReport} />
                            </div>
                        </div>
                        <div className="col-12" style={{ alignSelf: "baseline" }}>
                            <div className="dashboardcard p-lg-2 p-3 p-xxl-3" style={borderAndBoxShadowStyles}>
                                <Workanniversary />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Static components for reports */}
                <div className="col-12 mb-3 col-lg-6 col-md-9">
                    <div className="dashboardcard h-100 p-3" style={borderAndBoxShadowStyles}>
                        <div className="row">
                            <p className="textheader heading2 fw-bold">Sales Report</p>
                            <div className="col-12 mb-3 col-md-8">
                                <BarChartComponent />
                            </div>
                            <div className="col-12 mb-3 col-md-4 leftborders">
                                <Salesreport />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Static components for other sections */}
                <div className="col-12 mb-3 col-md-6">
                    <div className="dashboardcard h-100 p-3" style={borderAndBoxShadowStyles}>
                        <Prehiredashboard />
                    </div>
                </div>

                <div className="col-12 mb-3 col-md-6">
                    <div className="dashboardcard h-100 p-3" style={borderAndBoxShadowStyles}>
                        <Workforce />
                    </div>
                </div>

                <div className="col-12 mb-3 col-md-6 col-lg-3 px-0">
                    <div className="row h-100 align-content-between">
                        <div className="col-sm-12">
                            <div className="dashboardcard p-3 mb-3" style={borderAndBoxShadowStyles}>
                                <ProjectExtension />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                                <Openjobs />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-3 col-lg-3 col-md-6 px-0">
                    <div className="row h-100 align-content-between">
                        <div className="col-sm-12 mb-sm-2 mb-3">
                            <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                                <Vacationreport />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                                <Inineverify />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Static components for policies */}
                <div className="col-12 mb-3 col-lg-4 col-md-6">
                    <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                        <p className="textheader heading2 fw-bold">Policy/Procedure</p>
                        <div className="d-flex flex-wrap flex-column gap-3">
                            <div className="row p-0 mb-0">
                                <Policyprocedure />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-3 col-lg-4 col-md-6">
                    <div className="dashboardcard p-3" style={borderAndBoxShadowStyles}>
                        <Needhelp />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
