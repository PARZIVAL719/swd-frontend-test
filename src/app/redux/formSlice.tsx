import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  key: string;
  name: string;
  gender: string;
  mobile: string;
  nationality: string;
  passport: string;
  salary: string;
}

const initialState: FormState[] = [];

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormState>) => {
      const existingIndex = state.findIndex(item => item.key === action.payload.key);
      if (existingIndex !== -1) {
        state[existingIndex] = action.payload; 
      } else {
        state.push(action.payload); 
      }
      localStorage.setItem("formData", JSON.stringify(state));
    },
    resetForm: () => {
      localStorage.removeItem("formData");
      return [];
    },
  },
});

export const { addForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
