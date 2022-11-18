
// 호출 전 실행될 함수
const pending = (state, { payload }) => {
    return { ...state, loading: true };
};

// 호출 성공시 실행할 함수
const fulfilled = (state, { payload }) => {
    return {
        data: payload,
        loading: false,
        error: null,
    };
};

// 호출 실패시 실행할 함수
const rejected = (state, { payload }) => {
    return {
        ...state,
        loading: false,
        error: {
            code: payload?.state ? payload.status : 500,
            message: payload?.statusText ? payload.statusText : 'Server Error',
        }
    }
};

export { pending, fulfilled, rejected };