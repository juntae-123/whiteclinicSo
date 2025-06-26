import axios from "axios";

export async function getProfile() {
  const token = localStorage.getItem("accessToken");
  const res = await axios.get("http://localhost:3001/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
}
