import { create } from "apisauce";

// define the api
const api = create({
  baseURL: "http://192.168.1.100:1337/api",
  headers: {
    "X-API-Key":
      "206e60be8657ff434f5c025cfc55391ee9c30ebff25b95a04a8da7d37af3c4c2c3c42ed7b92c836769807e4f35f928dc50f4cecb69aeb945a6db8b0f0d69ce3cf39434383b6a1364338a11377a4dfdab8128a5410a613449dd2518ae81bf6bc2186edcb92cf3a300ad6789a2a30643ab20477b65043fa736c20792a2a41c279a",
  },
});

export const login = async (userData) => {
  try {
    const res = await api.post(
      "/auth/local",
      {
        identifier: userData.userName,
        password: userData.password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    console.error("API call failed: ", error);
    return null;
  }
};

export const getSliderBanners = async () => {
  try {
    const response = await api.get("/banners?populate=*");
    if (response.ok) {
      return response.data;
    } else {
      console.error(`Error: ${response.problem}`);
      return null;
    }
  } catch (error) {
    console.error("API call failed: ", error);
    return null;
  }
};

export const getCourseDetails = async () => {
  try {
    const response = await api.get("/courses?populate=*");
    if (response.ok) {
      return response.data;
    } else {
      console.error(`Error: ${response.originalError}`);
      return null;
    }
  } catch (error) {
    console.error("API call failed: ", error);
    return null;
  }
};

export const getInterCourseDetails = async () => {
  try {
    const res = await api.get("/course-intermediates?populate=*");
    if (res.ok) {
      return res.data;
    } else {
      console.error("Error: ", res.originalError);
      return null;
    }
  } catch (e) {
    console.error("API call failed: ", error);
    return null;
  }
};

export const getAdvCourseDetails = async () => {
  try {
    const res = await api.get("/course-advanceds?populate=*");
    if (res.ok) return res.data;
    else {
      console.error("Error: ", res.originalError);
      return null;
    }
  } catch (error) {
    console.error("Failed API call: ", error);
    return null;
  }
};
