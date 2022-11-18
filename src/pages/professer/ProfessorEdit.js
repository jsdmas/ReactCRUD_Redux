import React, { useCallback, useEffect, useMemo } from 'react';

import { getCurrentData, getItem, putItem } from '../../slices/ProfessorSlice';
import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import TableEx from '../../components/TableEx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ProfessorEdit = () => {
    /** 파라미터 값 받기 */
    const { id } = useParams();

    /** redux로 데이터 초기화 */
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.ProfessorSlice);

    /** 데이터 가져오기 */
    useEffect(() => {
        dispatch(getCurrentData());
    }, []);

    /** data 변경에 따른 사이드 이펙트 처리 */
    const item = useMemo(() => {
        if (data) {
            return data.find(v => v.id == id);
        } else {
            dispatch(getItem({ id }));
        }
    }, [data]);

    const navigate = useNavigate();
    const onSubmit = useCallback(e => {
        e.preventDefault();
        dispatch(putItem({
            id: e.currentTarget.id.value,
            name: e.currentTarget.name.value,
            userid: e.currentTarget.userid.value,
            position: e.currentTarget.position.value,
            sal: e.currentTarget.sal.value,
            hiredate: e.currentTarget.hiredate.value,
            comm: e.currentTarget.comm.value,
            deptno: e.currentTarget.deptno.value,
        })).then(result => navigate(`/professorView/${result.payload.id}`));
    }, []);

    return (
        <>
            <Spinner visible={loading} />
            {error ? (
                <ErrorView error={error} />
            ) : (
                <form onSubmit={onSubmit}>
                    <input type='hidden' name='id' defaultValue={item?.id} />
                    <TableEx>
                        <colgroup>
                            <col width='120' />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>교수이름</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='name' defaultValue={item?.name} />
                                </td>
                            </tr>
                            <tr>
                                <th>userid</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='userid' defaultValue={item?.userid} />
                                </td>
                            </tr>
                            <tr>
                                <th>position</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='position' defaultValue={item?.position} />
                                </td>
                            </tr>
                            <tr>
                                <th>sal</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='sal' defaultValue={item?.sal} />
                                </td>
                            </tr>
                            <tr>
                                <th>생일</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='hiredate' defaultValue={item?.hiredate} />
                                </td>
                            </tr>
                            <tr>
                                <th>comm</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='comm' defaultValue={item?.comm} />
                                </td>
                            </tr>
                            <tr>
                                <th>deptno</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='deptno' defaultValue={item?.deptno} />
                                </td>
                            </tr>
                        </tbody>
                    </TableEx>
                    <div style={{ textAlign: 'center' }}>
                        <button type='submit'>저장하기</button>
                    </div>
                </form>
            )}
        </>
    );
};

export default ProfessorEdit;