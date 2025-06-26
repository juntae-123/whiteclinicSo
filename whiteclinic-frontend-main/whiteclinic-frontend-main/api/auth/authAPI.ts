// src/api/auth.ts

import axios from "axios";

export interface SignupDto {
  user_email: string;
  user_password: string;
  user_name: string;
  phone_no: string;
}
export interface LoginDto {
  user_email: string;
  user_password: string;
}

export async function signup(data: SignupDto) {
  const res = await axios.post(`/api/auths/signup`, data, {
    withCredentials: true, // refreshToken 쿠키용
  });
  return res.data;
}

export async function login(data: LoginDto) {
  const res = await axios.post(`/api/auths/login`, data, {
    withCredentials: true, // refreshToken 쿠키용
  });
  const token = res.data?.data?.accessToken;
  if (token) {
    localStorage.setItem("accessToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return res.data;
}
export async function logout() {
  const res = await axios.post(
    `/api/auths/logout`,
    {},
    {
      withCredentials: true, // refreshToken 쿠키용
    }
  );
  return res.data;
}
