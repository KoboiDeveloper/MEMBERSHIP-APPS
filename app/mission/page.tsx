"use client";

import React, { useState } from "react";
import Mission from "./mission";
import History from "./history";
import Header from "@/components/Header";
import SuccessMessage from "@/components/SuccessMessage";

export default function Page() {
  const [menu, setMenu] = useState<"mission" | "history">("mission");
  const [successMessageJoin, setSuccessMessageJoin] = useState(false);

  const renderMenuContent = () => {
    if (menu === "mission")
      return <Mission setSuccessMessageJoin={setSuccessMessageJoin} />;
    if (menu === "history") return <History />;
    return null;
  };

  const handleMenuChange = (selectedMenu: "mission" | "history") => {
    setMenu(selectedMenu);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="bg-base-accent w-full min-h-screen">
          <Header>
            {successMessageJoin && (
              <div className="absolute top-0 left-0 right-0 z-50">
                <SuccessMessage message="Mission joined successfully." />
              </div>
            )}
            <div className="flex items-center justify-between mt-8">
              <span
                onClick={() => handleMenuChange("mission")}
                className="text-[10px] fontMon tracking-widest pointer"
              >
                MISI
              </span>
              <span
                onClick={() => handleMenuChange("history")}
                className="text-[10px] fontMon tracking-widest pointer"
              >
                RIWAYAT MISI
              </span>
            </div>
          </Header>

          {/* Content */}
          {renderMenuContent()}
        </div>
      </div>
    </div>
  );
}
