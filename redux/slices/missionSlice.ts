import { createSlice } from "@reduxjs/toolkit";
import { getMission } from "../thunks/missionThunks";
import { Mission } from "@/types/mission";

interface MissionState {
  loading: boolean;
  error: string | null;
  data: {
    missionsData: Mission[]; // Sesuaikan tipe data data sesuai dengan struktur respons API
  };
}

const initialState: MissionState = {
  loading: false,
  error: null,
  data: {
    missionsData: [],
  },
};

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    // Tambahkan reducers jika diperlukan
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMission.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default missionSlice.reducer;
