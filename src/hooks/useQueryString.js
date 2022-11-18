import { useLocation } from "react-router-dom";

export const useQueryString = () => {

    const { search } = useLocation();   //문자열 추출 : ?keyword=김도훈
    const query = new URLSearchParams(search);  //문자열을 객체로 변환 
    const params = Object.fromEntries(query);   // JSON 변환 : {keyword : '김도훈'}

    return params;
};

