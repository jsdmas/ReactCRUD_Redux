import { configureStore } from "@reduxjs/toolkit";

// Slice
import ProfessorSlice from "./slices/ProfessorSlice";
import StudentSlice from "./slices/StudentSlice";

const store = configureStore({ reducer: { ProfessorSlice, StudentSlice } });

export default store;