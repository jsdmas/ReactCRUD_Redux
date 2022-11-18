import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cloneDeep } from "lodash";
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';

// middleWare
/** 다중행 데이터 조회를 위한 비동기 함수 */
export const getList = createAsyncThunk('ProfessorSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;  // 결과값
    let params = null;  // 교수이름 검색값
    if (payload?.keyword) {
        params = {
            name: payload.keyword,
        }
    }
    try {
        const response = await axios.get(process.env.REACT_APP_API_PROFESSER_LIST, { params });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

/** 단일행 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk('/ProfessorSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.get(process.env.REACT_APP_API_PROFESSER_ITEM.replace(':id', payload.id));
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }
    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
export const postItem = createAsyncThunk('ProfessorSlice/postItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const response = await axios.post(process.env.REACT_APP_API_PROFESSER_LIST, {
            name: payload.name,
            userid: payload.userid,
            position: payload.position,
            sal: payload.sal,
            hiredate: payload.hiredate,
            comm: payload.comm,
            deptno: payload.deptno,
        });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk('ProfessorSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        // 환경설정에서 정의된 URL에서 ':id' 부분을 찾아 payload를 통해 전달된 일련번호로 치환 
        const response = await axios.delete(process.env.REACT_APP_API_PROFESSER_ITEM.replace(':id', payload.id));
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

/** 데이터 수정을 위한 비동기  함수 */
export const putItem = createAsyncThunk('/ProfessorSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        // 환경설정 파일에서 :id 값을 받은 payload의 id data로 치환
        const response = await axios.put(process.env.REACT_APP_API_PROFESSER_ITEM.replace(':id', payload.id), {
            name: payload.name,
            userid: payload.userid,
            position: payload.position,
            sal: payload.sal,
            hiredate: payload.hiredate,
            comm: payload.comm,
            deptno: payload.deptno,
        });
        result = response.data;
    } catch (e) {
        result = rejectWithValue(e.response);
    }
    return result;
});

const ProfessorSlice = createSlice({
    name: 'ProfessorSlice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: { getCurrentData: (state, action) => state },
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getList.pending]: pending,
        [getList.fulfilled]: fulfilled,
        [getList.rejected]: rejected,
        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getItem.pending]: pending,
        [getItem.fulfilled]: (state, { meta, payload }) => { return { data: [payload], loading: false, error: null } },
        [getItem.rejected]: rejected,
        /** 데이터 저장을 위한 액션 함수 */
        [postItem.pending]: pending,
        [postItem.fulfilled]: (state, { meta, payload }) => {
            // 기존의 상태값을 복사한다.(원본이 JSON이므로 깊은 복사를 수행해야 한다.)
            const data = cloneDeep(state.data);
            // 새로 저장된 결과를 기존 상태값 배열의 맨 뒤에 추가한다.
            data.push(payload);
            return {
                data, loading: false, error: null
            }
        },
        [postItem.rejected]: rejected,
        /** 데이터 삭제 위한 액션 함수 */
        [deleteItem.pending]: pending,
        [deleteItem.fulfilled]: (state, { meta, payload }) => {
            const data = cloneDeep(state.data);
            const targetId = data.findIndex((v) => v.id == meta.arg.id);
            data.splice(targetId, 1);
            return { data, loading: false, error: null };
        },
        [deleteItem.rejected]: rejected,
        /** 데이터 수정을 위한 액션 함수 */
        [putItem.pending]: pending,
        [putItem.fulfilled]: (state, { meta, payload }) => {
            const data = cloneDeep(state.data);
            const targetId = data.findIndex((v) => v.id == meta.arg.id);
            data.splice(targetId, 1, payload);
            return { data, loading: false, error: null };
        },
        [putItem.rejected]: rejected,


    },
});

export const { getCurrentData } = ProfessorSlice.actions;
export default ProfessorSlice.reducer;