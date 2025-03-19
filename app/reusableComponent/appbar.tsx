import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "/assets/img/search.svg";
import SearchBar from "./searchbar";
import digitalIcon from "/assets/img/digitallogo.svg";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import questionIcon from "/assets/img/question.svg";
import DropdownComponent from "./dropdown";
import { Colors } from "../reusableComponent/styles";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useRouter } from "next/navigation";
import Logout from "./logout";
import ImageComponent from "./image";
import { dropdownData } from "./JsonData";
import user from "@/public/assets/img/Ellipse 14.svg";
import Link from "next/link";
import { getBusinessUnitList } from "../api/Listingapis";
import { useDispatch, useSelector } from "react-redux";
import { setBunit } from "../redux/slices/bunitSlice";
import { RootState } from "../redux/store";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
];

export default function NavbarComponent() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const selectedBunites: any = useSelector(
    (state: RootState) => state.bussinessunit.bunit
  );

  const dispatch = useDispatch();

  const router = useRouter();
  const bunit = localStorage.getItem("bunit");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [selectedBunit, setSelectedBunit] = useState<string>(bunit || "");

  const [getbussinessunit, setbussinessunit] = useState<any>([]);

  useEffect(() => {
    const fetchPrehireData = async () => {
      try {
        const getbunit = await getBusinessUnitList();

        if (getbunit.status === 200) {
          if (getbunit?.data) {
            setbussinessunit(getbunit?.data);
          } else {
            console.warn("PreHireInfo key not found in response data.");
          }
        } else if (getbunit.status === 400) {
          console.error("Bad Request: Invalid input parameters.");
        } else if (getbunit.status === 500) {
          console.error("Server Error: Something went wrong on the backend.");
        } else {
        }
      } catch (error) {
        console.error("Failed to fetch prehire data:", error);
      }
    };

    fetchPrehireData();
  }, []);



  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (selectedBunit !== bunit) {
      dispatch(setBunit({ bunit: selectedBunit }));
    } else {
      dispatch(setBunit({ bunit: bunit }));
    }
  }, [selectedBunit]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ top: "40px", left: "27px" }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className="textheader" href="/profile" passHref>
          Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <Logout />
      </MenuItem>
    </Menu>
  );
  const useColors = Colors();
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {/* <Image src={digitalIcon} alt="" /> */}
        <ImageComponent
          width={30}
          height={30}
          user={"/assets/img/digitallogo.svg"}
        />
      </MenuItem>
      <MenuItem>
        <select
          name=""
          id=""
          onChange={(e) => setSelectedBunit(e.target.value)}
          value={selectedBunit}
        >
          {getbussinessunit?.map((bunitlist: any, index: number) => (
            <option key={index} value={bunitlist?.bunitId}>
              {bunitlist?.description}
            </option>
          ))}
        </select>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <div className="d-flex" style={{ position: "relative" }}>
            <NotificationsNoneOutlinedIcon sx={{ color: useColors.themeRed }} />
            <div
              className="notificationround"
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: useColors.themeRed,
                right: "14%",
                top: "10%",
                border: "1px solid white",
              }}
            ></div>
          </div>
        </IconButton>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar src="" alt="Remy Sharp" />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: "transparent",
            marginTop: "10px",
            width: "100%",
            boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
            "& .MuiToolbar-root": {
              padding: "0 50px 0 20px",
            },
          }}
        >
          <Toolbar>
            {/* Conditionally render SearchBar and SearchIcon */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <SearchBar list={top100Films} />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: "3px" }}>
              {/* <Image src={digitalIcon} alt="" /> */}
              <ImageComponent
                width={100}
                height={100}
                user={"/assets/img/digitallogo.svg"}
              />

              {/* <DropdownComponent dropdownlist={dropdownData}/> */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {/* <Image fill src={"/assets/img/question.svg"} alt="" /> */}
                <ImageComponent
                  width={30}
                  height={30}
                  user={"/assets/img/question.svg"}
                />
              </Box>

              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                {/* <Image src={SearchIcon} alt="" /> */}
                <ImageComponent
                  width={15}
                  height={15}
                  user={"/assets/img/search.svg"}
                />
              </Box>
              <select
                className="dropdowncolor para cursorPointer"
                style={{ background: "transparent" }}
                name=""
                id=""
                onChange={(e) => setSelectedBunit(e.target.value)}
                value={selectedBunit}
              >
                {getbussinessunit?.map((bunitlist: any, index: number) => (
                  <option key={index} value={bunitlist?.bunitId}>
                    {bunitlist?.description}
                  </option>
                ))}
              </select>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <div className="d-flex" style={{ position: "relative" }}>
                  <NotificationsNoneOutlinedIcon
                    sx={{ color: useColors.themeRed }}
                  />
                  <div
                    className="notificationround"
                    style={{
                      position: "absolute",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: useColors.themeRed,
                      right: "14%",
                      top: "10%",
                      border: "1px solid white",
                    }}
                  ></div>
                </div>
              </IconButton>
              <div
                style={{ width: "35px", height: "35px" }}
                onClick={handleProfileMenuOpen}
              >
                <Image
                  className="w-100 h-100 rounded-circle"
                  src={user}
                  style={{ objectFit: "cover" }}
                  alt={""}
                />
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}
