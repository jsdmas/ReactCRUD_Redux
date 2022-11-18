import { configureStore } from "@reduxjs/toolkit";

// Slice
import ProfessorSlice from "./slices/ProfessorSlice";

const store = configureStore({ reducer: { ProfessorSlice, } });

export default store;