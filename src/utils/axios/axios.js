import axios from "axios";
import { enqueueSnackbar } from "notistack";
axios.defaults.baseURL = "http://localhost:8000/api/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const GetProjectKeywords = async (data) => {
  return await axios
    .get("get-project-keywords", {
      params: data,
    })
    .then((res) => {
      if (res.data.status === 200) {
        return res.data.data;
      } else {
        enqueueSnackbar(res.data.error_message, {
          variant: "error",
          style: { borderRadius: "20%" },
        });
        return false;
      }
    });
};
