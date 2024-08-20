import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Route } from "components/routes/Routes";

export const useRedirect = (isSuccess: boolean, navigateTo: Route) => {
  const navigate = useNavigate();

  useEffect(() => {

    if (isSuccess) {
      navigate(navigateTo);
    }
  }, [isSuccess, navigate]);
};
