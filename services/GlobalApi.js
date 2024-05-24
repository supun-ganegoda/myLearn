import { create } from "apisauce";

// define the api
const api = create({
  baseURL: "http://192.168.1.102:1337/api",
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

export const registerUser = async (userData) => {
  try {
    const res = await api.post(
      "/auth/local/register",
      {
        username: userData.userName,
        email: userData.email,
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

export const getSliderBanners = async (token) => {
  try {
    const response = await api.get(
      "/banners?populate=*",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const getCourseDetails = async (token) => {
  try {
    const response = await api.get(
      "/courses?populate=*",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const getInterCourseDetails = async (token) => {
  try {
    const res = await api.get(
      "/course-intermediates?populate=*",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export const getAdvCourseDetails = async (token) => {
  try {
    const res = await api.get(
      "/course-advanceds?populate=*",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
