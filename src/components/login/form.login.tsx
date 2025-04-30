import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "@lib/api/api-hooks/use-LoginUser";
import Loader from "../ui-componets/load/Loader";

import TEC from "@png/TecVertical.svg";
import ITL from "@png/itl.svg";

export interface FormData {
  email: string;
  password: string;
}

const FormLogin: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginUser, loading, error } = useLoginUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onFormSubmit = async (data: FormData) => {
    try {
      const { user } = await loginUser(data.email, data.password);
      
      if (user.user_type === 0) {
        navigate(`/admin/${user.user_id}/profile`, { replace: true });
      } else if (user.user_type === 1) {
        navigate(`/admin/${user.user_id}/profile`, { replace: true });
      } else if (user.user_type === 2) {
        navigate(`/student/${user.user_id}/profile`, { replace: true });
      } else {
        console.error("Tipo de usuario desconocido");
      }
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  return (
    <>
    {loading && <Loader />}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-row md:hidden items-center justify-between pb-10">
          <img src={TEC} alt="TecNM LOGO" className="w-30 h-30" />
          <img src={ITL} alt="ITL LOGO" className="w-30 h-30" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">
          {t("LOGIN.FORM.TITLE")}
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-primary">
              {t("LOGIN.FORM.EMAIL")}
            </label>
            <input
              type="text"
              {...register("email", {
                required: t("LOGIN.FORM.EMAIL_REQUIRED"),
              })}
              placeholder={t("LOGIN.FORM.EMAIL_PLACEHOLDER")}
              className="input"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="pb-5">
            <label className="block mb-1 font-medium text-primary">
              {t("LOGIN.FORM.PASSWORD")}
            </label>
            <input
              type="password"
              {...register("password", {
                required: t("LOGIN.FORM.PASSWORD_REQUIRED"),
              })}
              placeholder={t("LOGIN.FORM.PASSWORD_PLACEHOLDER")}
              className="input"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="create w-60" disabled={loading}>
            {t("LOGIN.FORM.LOGIN")}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="mt-4 text-sm text-left">
          <a href="#" className="text-secondary hover:underline">
            {t("LOGIN.FORGOT_PASSWORD")}
          </a>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
