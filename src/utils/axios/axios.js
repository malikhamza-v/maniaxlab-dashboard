import Snackbar from "@/components/snackbar";
import axios from "axios";
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
        Snackbar(res.data.error_message, "error");
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
      Snackbar("Invalid Credentials!", "error");
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

export const GenerateReferralCode = async (data) => {
  return await axios
    .post("payments/generate-referral-code/", data)
    .then((res) => {
      if (res.data.status === 400) {
        Snackbar(res.data.message, "info");
        return false;
      } else if (res.data.status === 201) {
        Snackbar(res.data.message, "success");
        return true;
      }
      return true;
    });
};

export const GetProjects = async (data) => {
  return await axios
    .get("get-client-projects/", {
      params: data,
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const GetUserStats = async () => {
  return await axios
    .get("get-user-stats/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const GetReferralProjects = async (data) => {
  return await axios
    .get("payments/get-referral-projects/", {
      params: data,
    })
    .then((res) => {
      return res.data;
    });
};

export const getDomainAnalytics = async (data) => {
  return await axios
    .get("get-project-analytics/", {
      params: data,
    })
    .then((res) => {
      if (res.data.status === 200) {
        return res.data.analytics;
      } else {
        Snackbar(res.data.message, "error");
        return false;
      }
    });
};
