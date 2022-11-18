import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getCurrentData, getItem } from '../../slices/ProfessorSlice';

import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import Table from '../../components/Table';

const ProfessorView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.ProfessorSlice);

    useEffect(() => {
        dispatch(getCurrentData());
    }, []);

    const item = useMemo((e) => {
        if (data) {
            return data.find(v => v.id == id);
        } else {
            dispatch(getItem({ id }));
        }
    }, [data]);

    const onClickDelete = useCallback(e => {
        e.preventDefault();
        const { id, name } = e.currentTarget.dataset;
        if (window.confirm(`정말 ${name}을 삭제하겠습니까?`)) {
            dispatch(deleteItem({ id })).then(() => { navigate(`/professorlist`); });
        }
    }, []);


    return (
        <>
            <Spinner visible={loading} />
            {error ? (<ErrorView error={error} />) : (
                item && (
                    <>
                        <Table>
                            <colgroup>
                                <col width='120' />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>name</th>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <th>userid</th>
                                    <td>{item.userid}</td>
                                </tr>
                                <tr>
                                    <th>position</th>
                                    <td>{item.position}</td>
                                </tr>
                                <tr>
                                    <th>sal</th>
                                    <td>{item.sal}</td>
                                </tr>
                                <tr>
                                    <th>hiredate</th>
                                    <td>{(item.hiredate).substring(0, 10)}</td>
                                </tr>
                                <tr>
                                    <th>comm</th>
                                    <td>{item.comm}</td>
                                </tr>
                                <tr>
                                    <th>deptno</th>
                                    <td>{item.deptno}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{ textAlign: 'center' }}>
                            <NavLink to='/professorList'>목록</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to='/professorAdd'>등록</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to={`/professorEdit/${item.id}`}>수정</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to='/#!' data-id={item.id} data-name={item.name} onClick={onClickDelete}>삭제</NavLink>
                        </div>
                    </>
                )
            )}
        </>
    );
};

export default memo(ProfessorView);