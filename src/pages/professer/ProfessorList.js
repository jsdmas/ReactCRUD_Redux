import React, { useCallback, memo, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
// components
import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import Table from '../../components/Table';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getList } from '../../slices/ProfessorSlice';
// hooks
import { useQueryString } from '../../hooks/useQueryString';


// 입력 컨트롤들을 포함하는 박스
const ControlContainer = styled.form`
position: sticky;
top: 0;
background-color: #fff;
border-top:1px solid #eee;
border-bottom: 1px solid #eee;
padding: 10px 0;
    .controll{
        margin-right: 5px;
        display: inline-block;
        font-size: 16px;
        padding: 7px 10px 5px 10px;
        border: 1px solid #ccc;
    }
    .clickable{
        background-color: #fff;
        color: #000;
        text-decoration: none;
        cursor: pointer;
        &:hover{
            background-color: #06f2;
        }
        &:active{
            transform: scale(0.9,0.9);
        }
    }
`;

const ProfessorList = () => {
    /** input의 검색 입력값 받기 */
    const { keyword } = useQueryString();
    /** 페이지 강제이동 navigation함수 생성 */
    const navigate = useNavigate();
    /** 검색이벤트 */
    const onSearchSubmit = useCallback((e) => {
        e.prevnetDefault();
        const keyword = e.currentTarget.keyword;
        let redirectUrl = keyword.value ? `/?keyword=${keyword.value}` : `/`;
        navigate(redirectUrl);
    }, [navigate]);

    // redux
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.ProfessorSlice);
    useEffect(() => {
        dispatch(getList({ keyword }));
    }, [dispatch]);

    const onClickDelete = useCallback(e => {
        e.preventDefault();
        const { id, name } = e.currentTarget.dataset;
        if (window.confirm(`정말 ${name}을 삭제하겠습니까?`)) {
            dispatch(deleteItem({ id }));
        }
    }, []);

    const onClickEdit = useCallback(e => {
        e.preventDefault();
        const { id } = e.currentTarget.dataset;
        navigate(`/ProfessorEdit/${id}`);
    }, []);

    return (
        <>
            <Spinner visible={loading} />

            <ControlContainer onSubmit={onSearchSubmit}>
                <input type="text" name="keyword" className="controll" />
                <button type='submit' className='controll clickable'>검색</button>
                <NavLink to='/professorAdd' className="controll clickable">교수정보 추가히기</NavLink>
            </ControlContainer>

            {error ? (<ErrorView error={error} />) : (
                data && (
                    <Table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>userid</th>
                                <th>position</th>
                                <th>sal</th>
                                <th>생일</th>
                                <th>comm</th>
                                <th>deptno</th>
                                <th>id</th>
                                <th>수정</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? (data.map((v) => {
                                    return (
                                        <tr key={v.id}>
                                            <td>
                                                <NavLink to={`/professorView/${v.id}`}>{v.name}</NavLink>
                                            </td>
                                            <td>{v.userid}</td>
                                            <td>{v.position}</td>
                                            <td>{v.sal}</td>
                                            <td>{(v.hiredate).substring(0, 10)}</td>
                                            <td>{v.comm}</td>
                                            <td>{v.deptno}</td>
                                            <td>{v.id}</td>
                                            <td>
                                                <button type='button' data-id={v.id} onClick={onClickEdit}>
                                                    수정하기
                                                </button>
                                            </td>
                                            <td>
                                                <button type='button' data-id={v.id} data-name={v.name} onClick={onClickDelete}>
                                                    삭제하기
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })) : (<tr><td colSpan='5' align='center'>검색결과가 없습니다.</td></tr>)
                            }
                        </tbody>
                    </Table>
                )
            )}
        </>
    );
};

export default memo(ProfessorList);