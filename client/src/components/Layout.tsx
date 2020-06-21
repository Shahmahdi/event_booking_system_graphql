import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const Layout = (props: { component: any }) => {
  const [openSidebar, setOpenSidebar] = useState(
    window.innerWidth <= 760 ? false : true
  );
  const [smallDevice, setSmallDevice] = useState(window.innerWidth <= 760);

  useEffect(() => {
    window.addEventListener("resize", () => {
      let isBigScreen = window.innerWidth >= 760;
      if (isBigScreen === true && openSidebar === false) {
        setOpenSidebar(true);
        setSmallDevice(false);
      } else if (isBigScreen === false && openSidebar === true) {
        setOpenSidebar(false);
        setSmallDevice(true);
      }
    });
  });

  return (
    <div className="flex w-full h-screen">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} smallDevice={smallDevice} />
      <div className="flex flex-col flex-1">
        <Topbar setOpenSidebar={() => setOpenSidebar(!openSidebar)} />
        <div className="flex-1 p-3 bg-gray-100 overflow-y-auto">
          {props.component()}
        </div>
      </div>
    </div>
  );
};
