import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import { deleteItem, getCurrentData } from '../../slices/StudentSlice';
import { getItem } from '../../slices/StudentSlice';


const StudentView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.StudentSlice);

    useEffect(() => {
        dispatch(getCurrentData());
    }, [dispatch]);

    const item = useMemo(() => {
        if (data) {
            return data.find(v => v.id == id);
        } else {
            dispatch(getItem({ id }));
        }
    }, [data]);

    const onClick = useCallback(e => {
        e.preventDefault();
        const { id, name } = e.currentTarget.dataset;
        if (window.confirm(`정말 ${name}을 삭제하겠습니까?`)) {
            dispatch(deleteItem({ id })).then(() => { navigate(`/studentlist`) });
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
                                    <th>id</th>
                                    <td>{item.id}</td>
                                </tr>
                                <tr>
                                    <th>name</th>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <th>userid</th>
                                    <td>{item.userid}</td>
                                </tr>
                                <tr>
                                    <th>grade</th>
                                    <td>{item.grade}</td>
                                </tr>
                                <tr>
                                    <th>idnum</th>
                                    <td>{item.idnum}</td>
                                </tr>
                                <tr>
                                    <th>birthdate</th>
                                    <td>{(item.birthdate).substring(0, 10)}</td>
                                </tr>
                                <tr>
                                    <th>tel</th>
                                    <td>{item.tel}</td>
                                </tr>
                                <tr>
                                    <th>height</th>
                                    <td>{item.height}</td>
                                </tr>
                                <tr>
                                    <th>weight</th>
                                    <td>{item.weight}</td>
                                </tr>
                                <tr>
                                    <th>deptno</th>
                                    <td>{item.deptno}</td>
                                </tr>
                                <tr>
                                    <th>profno</th>
                                    <td>{item.profno}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{ textAlign: 'center' }}>
                            <NavLink to='/studentlist'>목록</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to='/studentAdd'>등록</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to={`/studentEdit/${item.id}`}>수정</NavLink>
                            &nbsp; | &nbsp;
                            <NavLink to='/#!' data-id={item.id} data-name={item.name} onClick={onClick}>삭제</NavLink>
                        </div>
                    </>
                )
            )}
        </>
    );
};

export default memo(StudentView);