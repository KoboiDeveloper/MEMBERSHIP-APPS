import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryPromo = createAsyncThunk(
  "promo/getCategoryPromo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}promo/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);
