import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { deleteItem, getList } from '../../slices/StudentSlice';
import styled from 'styled-components';
import { useQueryString } from '../../hooks/useQueryString';

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

const StudentList = () => {
    const { keyword } = useQueryString();

    const navigate = useNavigate();
    // redux
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.StudentSlice);

    useEffect(() => {
        dispatch(getList({ keyword }));
    }, [dispatch])

    const onClick = useCallback(e => {
        e.preventDefault();
        const { id, name } = e.currentTarget.dataset;
        if (window.confirm(`정말 ${name}을 삭제하겠습니까?`)) {
            dispatch(deleteItem({ id }));
        }
    }, []);

    const onSearch = useCallback(e => {
        const keyword = e.currentTarget.keyword;
        let redirectUrl = keyword.value ? `/studentlist?keyword=${keyword.value}` : `/studentlist`;
        navigate(redirectUrl);
    }, [navigate]);

    const onClickEdit = useCallback(e => {
        e.preventDefault();
        const { id } = e.currentTarget.dataset;
        navigate(`/studentView/${id}`);
    }, []);

    return (
        <>
            <Spinner visible={loading} />
            <ControlContainer onSubmit={onSearch}>
                <input type='text' name='keyword' className="controll" />
                <button type='submit' className='controll clickable'>검색</button>
                <NavLink to='/studentAdd' className="controll clickable">학생정보 추가히기</NavLink>
            </ControlContainer>
            {error ? (<ErrorView error={error} />) : (
                data && (
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>userid</th>
                                <th>grade</th>
                                <th>idnum</th>
                                <th>birthdate</th>
                                <th>tel</th>
                                <th>height</th>
                                <th>weight</th>
                                <th>deptno</th>
                                <th>profno</th>
                                <th>수정</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (data.map(v => {
                                return (
                                    <tr key={v.id}>
                                        <td>{v.id}</td>
                                        <td><NavLink to={`/studentView/${v.id}`}>{v.name}</NavLink></td>
                                        <td>{v.userid}</td>
                                        <td>{v.grade}</td>
                                        <td>{v.idnum}</td>
                                        <td>{(v.birthdate).substring(0, 10)}</td>
                                        <td>{v.tel}</td>
                                        <td>{v.height}</td>
                                        <td>{v.weight}</td>
                                        <td>{v.deptno}</td>
                                        <td>{v.profno}</td>
                                        <td><button data-id={v.id} onClick={onClickEdit}>수정하기</button></td>
                                        <td><button data-id={v.id} data-name={v.name} onClick={onClick}>삭제하기</button></td>
                                    </tr>
                                );
                            })) : (<tr><td colSpan="13" align="center">검색결과가 없습니다.</td></tr>)}
                        </tbody>
                    </Table>
                )
            )}
        </>
    );
};

export default memo(StudentList);