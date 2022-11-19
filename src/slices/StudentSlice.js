import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";
import axios from "axios";

// 미들웨어
export const getList = createAsyncThunk('StudentSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;
    let params = null;
    if (payload?.keyword) {
        params = {
            name: payload.keyword,
        }
    }
    try {
        const response = await axios.get(process.env.REACT_APP_API_STUDENT_LIST, { params });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

export const getItem = createAsyncThunk('StudentSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(process.env.REACT_APP_API_STUDENT_ITEM.replace(':id', payload.id));
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

export const postItem = createAsyncThunk('StudentSlice/postItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.post(process.env.REACT_APP_API_STUDENT_LIST, {
            name: payload.name,
            userid: payload.userid,
            grade: payload.grade,
            idnum: payload.idnum,
            birthdate: payload.birthdate,
            tel: payload.tel,
            height: payload.height,
            deptno: payload.deptno,
            profno: payload.profno,
        });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

export const deleteItem = createAsyncThunk('StudentSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.delete(process.env.REACT_APP_API_STUDENT_ITEM.replace(':id', payload.id));
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

export const putItem = createAsyncThunk('StudentSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.put(process.env.REACT_APP_API_STUDENT_ITEM.replace(':id', payload.id), {
            name: payload.name,
            userid: payload.userid,
            grade: payload.grade,
            idnum: payload.idnum,
            birthdate: payload.birthdate,
            tel: payload.tel,
            height: payload.height,
            deptno: payload.deptno,
            profno: payload.profno,
        });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

const StudentSlice = createSlice({
    name: "StudentSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: { getCurrentData: (state, payload) => state },
    extraReducers: {
        [getList.pending]: pending,
        [getList.fulfilled]: fulfilled,
        [getList.rejected]: rejected,

        [getItem.pending]: pending,
        [getItem.fulfilled]: (state, { meta, payload }) => { return { data: [payload], loading: false, error: null }; },
        [getItem.rejected]: rejected,

        [postItem.pending]: pending,
        [postItem.fulfilled]: (state, { meta, payload }) => {
            const data = cloneDeep(state.data);
            data.push(payload);
            return { data, loading: false, error: null };
        },
        [postItem.rejected]: rejected,

        [deleteItem.pending]: pending,
        [deleteItem.fulfilled]: (state, { meta, payload }) => {
            const data = cloneDeep(state.data);
            const targetId = data.findIndex(v => v.id == meta.arg.id);
            data.splice(targetId, 1);
            return { data, loading: false, error: null };
        },
        [deleteItem.rejected]: rejected,

        [putItem.pending]: pending,
        [putItem.fulfilled]: (state, { meta, payload }) => {
            const data = cloneDeep(state.data);
            const targetId = data.findIndex(v => v.id == meta.arg.id);
            data.splice(targetId, 1, payload);
            return { data, loading: false, error: null };
        },
        [putItem.rejected]: rejected,
    }
});
export const { getCurrentData } = StudentSlice.actions;
export default StudentSlice.reducer;