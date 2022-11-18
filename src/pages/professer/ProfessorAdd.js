import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { postItem } from '../../slices/ProfessorSlice';

import Spinner from '../../components/Spinner';
import ErrorView from '../../components/ErrorView';
import TableEx from '../../components/TableEx';

const ProfessorAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.ProfessorSlice);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(postItem({
            name: e.currentTarget.name.value,
            userid: e.currentTarget.userid.value,
            position: e.currentTarget.position.value,
            sal: e.currentTarget.sal.value,
            hiredate: e.currentTarget.hiredate.value,
            comm: e.currentTarget.comm.value,
            deptno: e.currentTarget.deptno.value,
        })).then((result) => {
            navigate(`/professorView/${result.payload.id}`);
        })
    }, []);

    return (
        <>
            <Spinner visible={loading} />
            {error ? (
                <ErrorView error={error} />
            ) : (
                <form onSubmit={onSubmit}>
                    <TableEx>
                        <colgroup>
                            <col width='120' />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>교수이름</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='name' />
                                </td>
                            </tr>
                            <tr>
                                <th>userid</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='userid' />
                                </td>
                            </tr>
                            <tr>
                                <th>position</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='position' />
                                </td>
                            </tr>
                            <tr>
                                <th>sal</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='sal' />
                                </td>
                            </tr>
                            <tr>
                                <th>생일</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='hiredate' />
                                </td>
                            </tr>
                            <tr>
                                <th>comm</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='comm' />
                                </td>
                            </tr>
                            <tr>
                                <th>deptno</th>
                                <td className='inputWrapper'>
                                    <input className='field' type='text' name='deptno' />
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

export default memo(ProfessorAdd);