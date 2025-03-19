"use client";
import "./timesheet.css";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TimesheetDataByMonth, holidayList, vacationList } from "../reusableComponent/JsonData";
import Sidebar from "../sidebar/page";

// Dynamic Imports with ssr: false for client-side rendering only
const Listofholidays = dynamic(() => import("./components/listofholidays"), { ssr: false });
const Timesheetaproover = dynamic(() => import("./components/listofholidays").then(mod => mod.Timesheetaproover), { ssr: false });
const Timesheetcalendar = dynamic(() => import("./components/timesheetscalendar"), { ssr: false });
const Totalsummary = dynamic(() => import("./components/totalsummarydetails").then(mod => mod.Totalsummary), { ssr: false });
const Totalsummarycards = dynamic(() => import("./components/totalsummarydetails").then(mod => mod.Totalsummarycards), { ssr: false });
const Uploadfiles = dynamic(() => import("./components/uploadfiles"), { ssr: false });
const Viewfiles = dynamic(() => import("./components/uploadfiles").then(mod => mod.Viewfiles), { ssr: false });
const MonthlyCalendar = dynamic(() => import("../reusableComponent/calendar/monthlyCalendar"), { ssr: false });
const WeeklyCalendar = dynamic(() => import("../reusableComponent/calendar/weeklycalendar"), { ssr: false });
const SemiMonthlyCalendar = dynamic(() => import("../reusableComponent/calendar/semimonthlyCalendar"), { ssr: false });
const BiWeeklyCalendar = dynamic(() => import("../reusableComponent/calendar/biweeklycalendar"), { ssr: false });

export default function Timesheet() {
  const [showSummaryCards, setShowSummaryCards] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimeSheetList] = useState<any>(TimesheetDataByMonth);
  const [getWeeklyList, setgetWeeklyList] = useState<Array<any>>([]);
  const [holidayPerMonth, setHolidayPerMonth] = useState<Array<any>>([]);
  const [vacationPerMonth, setVacationPerMonth] = useState<Array<any>>([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const loginDatas: any = useSelector((state: RootState) => state.login.user);
  const role = useSelector((state: RootState) => state.role.role);

  useEffect(() => {
    setTimeSheetList(TimesheetDataByMonth);
  }, [TimesheetDataByMonth]);

  const timesheetDataConvertedToFetchCalendar = timesheetList.flat();
  const codeItems = timesheetDataConvertedToFetchCalendar?.filter(
    (item: any) => item.codeId && item.codeLabel
  );
  const timesheetItems = timesheetDataConvertedToFetchCalendar?.filter(
    (item: any) => item.codeId && item.day
  );
  
  const ConvertedTimeSheetForCalendar = timesheetItems?.map(
    (timesheetItem: any) => {
      const code = codeItems?.find(
        (codeItem: any) => codeItem.codeId === timesheetItem.codeId
      );
      return {
        ...timesheetItem,
        codeLabel: code ? code.codeLabel : "",
      };
    }
  );

  const handleWeekList = (weeklistData: any) => {
    setgetWeeklyList(weeklistData);
  };

  const handleHolidayandVacationList = (month: any, year: any) => {
    const holidayresult = holidayList.filter(
      (list) => list.month === month && list.year === year.toString()
    );
    setHolidayPerMonth(holidayresult);

    const vacationresult = vacationList.filter(
      (list) => list.month === month && list.year === year.toString()
    );
    setVacationPerMonth(vacationresult);
  };

  const handleSelectedMonth = (month: any, year: any) => {
    let convertedMonth = moment(month + 1, "M").format("MMMM");
    setSelectedMonth(convertedMonth);
    setSelectedYear(year);
  };

  useEffect(() => {
    handleHolidayandVacationList(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <Sidebar>
      <section className="timesheet mt-3">
        <div className="container-fluid px-0  mb-3">
          <div className="row">
            <div className="col-lg-4 col-xxl-3 borderright">
              <div className="row px-0">
                <div className="col-lg-12 px-0 col-sm-6">
                  <div className="calendar">
                    {loginDatas?.userInfo?.paySchedule === "Monthly" ? (
                      <MonthlyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    ) : loginDatas?.userInfo?.paySchedule === "Weekly" ? (
                      <WeeklyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    ) : loginDatas?.userInfo?.paySchedule === "Bi-Weekly" ? (
                      <BiWeeklyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    ) : (
                      <SemiMonthlyCalendar
                        value={currentDate}
                        onChange={setCurrentDate}
                        calendardatas={ConvertedTimeSheetForCalendar}
                        weeklyList={handleWeekList}
                        handleSelectedMonth={handleSelectedMonth}
                      />
                    )}
                  </div>
                  <Totalsummary showsummarycards={() => setShowSummaryCards(!showSummaryCards)} />
                </div>
                <div className="col-lg-12 col-sm-6 d-sm-block d-none">
                  <Timesheetaproover />
                  <Listofholidays holidayPerMonth={holidayPerMonth} vacationPerMonth={vacationPerMonth} />
                  <Viewfiles />
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-lg-8 col-md-12">
              {showSummaryCards ? <Totalsummarycards /> : <Timesheetcalendar timesheetList={timesheetList} calendardatas={ConvertedTimeSheetForCalendar} weekListDatas={getWeeklyList} />}
            </div>
            <div className="col-12 d-block d-sm-none">
              <Timesheetaproover />
              <Listofholidays holidayPerMonth={holidayPerMonth} vacationPerMonth={vacationPerMonth} />
              <Viewfiles />
            </div>
          </div>
        </div>
        <Uploadfiles />
      </section>
    </Sidebar>
  );
}
