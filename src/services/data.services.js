import axios from "axios";

export const saveData = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/data", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
    // navigate("/data");
  } catch (error) {
    throw error.response;
  }
};
