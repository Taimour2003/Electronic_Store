// import API from "../../Api";


// export const loginUser = async (email, password) => {
//   try {
//     const { data } = await API.post("/users/login", { email, password });
//     localStorage.setItem("userInfo", JSON.stringify(data));
//     return data;
//   } catch (error) {
//     console.error("Login failed:", error.response?.data?.message || error.message);
//     throw error;
//   }
// };