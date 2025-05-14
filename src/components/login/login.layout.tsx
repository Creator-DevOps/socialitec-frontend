import React, { useState } from "react";
import Branding from "./branding";
import FormLogin from "./form.login"; 
import Header from "./header";
import Footer from "./footer";

import { useTranslation } from "react-i18next";
interface FormData {
  numeroControl: string;
  password: string;
}

const LoginLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col md:flex-row">
        <Branding />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md mx-auto my-20">
              <FormLogin/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LoginLayout;
