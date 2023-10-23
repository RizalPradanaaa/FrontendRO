import axios from "axios";

export const compareExcel = async (file1, file2) => {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);

  try {
    const response = await axios.post(
      "http://localhost:5000/compare",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
