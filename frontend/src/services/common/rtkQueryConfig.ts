import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Constant from "utilities/Constant";

// initialize an empty api service that we'll inject endpoints into later as needed


export const rtkQueryInstance = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: Constant.BASE_BFF_WEB_URL }),
  endpoints: () => ({}),
});
