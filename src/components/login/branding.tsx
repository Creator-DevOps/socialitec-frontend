import React from "react";

import { useTranslation } from "react-i18next";
import TEC from "@png/tec.svg";
import ITL from "@png/itl.svg";

const Branding = () => {
  const { t } = useTranslation();
  return (
    <aside className="hidden md:flex flex-col items-center w-1/4 bg-gray-fondo  p-8 ">
      <img src={TEC} alt="" className="w-full" />
      <div className="flex-1 flex items-center justify-center">
        <img src={ITL} alt="" className="w-40" />
      </div>
    </aside>
  );
};

export default Branding;
