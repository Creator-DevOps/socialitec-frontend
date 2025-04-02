import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TEC from "@png/TecVertical.png";
import ITL from "@png/itl.png";

export interface FormData {
  numeroControl: string;
  password: string;
}
interface FormLoginProps {
  onSubmit: (data: FormData) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    numeroControl: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const validateForm = () => {
    let errors: Partial<FormData> = {};
    if (!formData.numeroControl.trim()) {
      errors.numeroControl = t("LOGIN.FORM.EMAIL_REQUIRED");
    }
    if (!formData.password) {
      errors.password = t("LOGIN.FORM.PASSWORD_REQUIRED");
    }
    return errors;
  };

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(formData); 
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="flex flex-row md:hidden items-center justify-between pb-10">
        <img src={TEC} alt="TecNM LOGO" className="w-30 h-30"/>
        
          <img src={ITL} alt="ITL LOGO" className="w-30 h-30" />


      </div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">
        {t("LOGIN.FORM.TITLE")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-primary">
            {t("LOGIN.FORM.EMAIL")}
          </label>
          <input
            type="text"
            name="numeroControl"
            value={formData.numeroControl}
            placeholder={t("LOGIN.FORM.EMAIL_PLACEHOLDER")}
            onChange={handleChange}
            className="input"
          />
          {errors.numeroControl && (
            <p className="text-red-500 text-xs mt-1">{errors.numeroControl}</p>
          )}
        </div>

        <div className="pb-5">
          <label className="block mb-1 font-medium text-primary">
            {t("LOGIN.FORM.PASSWORD")}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={t("LOGIN.FORM.PASSWORD_PLACEHOLDER")}
            onChange={handleChange}
            className="input"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>


        <button
          type="submit"
          className="send w-60"
        >
          {t("LOGIN.FORM.LOGIN")}
        </button>
      </form>


      <div className="mt-4 text-sm text-left">
        <a href="#" className="text-secondary hover:underline">
          {t("LOGIN.FORGOT_PASSWORD")}
        </a>
      </div>
    </div>
  );
};

export default FormLogin;
