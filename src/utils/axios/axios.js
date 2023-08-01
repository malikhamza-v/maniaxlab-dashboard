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

export const loginUser = async (data) => {
  return await axios
    .post("login/", data)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    })
    .catch((error) => {
      return false;
    });
};

export const loginWithToken = async () => {
  return await axios
    .get("token-login/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {});
};

export const UpdateUserInfo = async (user_id, data) => {
  return await axios.put(`update-user/${user_id}/`, data).then(async (res) => {
    if (res.data.status === 204) {
      return true;
    } else if (res.data.status === 500) {
      return false;
    }
  });
};
