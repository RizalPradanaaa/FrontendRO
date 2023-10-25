import axios from "axios";

export const getAllData = async (callback) => {
  axios
    .get("http://localhost:5000/data")
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

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

export const deleteDataId = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/data/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
