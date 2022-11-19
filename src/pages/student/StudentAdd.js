import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Spinner from '../../components/Spinner';
import TableEx from '../../components/TableEx';
import { postItem } from '../../slices/StudentSlice';

const StudentAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.StudentSlice);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        dispatch(postItem({
            name: e.currentTarget.name.value,
            userid: e.currentTarget.userid.value,
            grade: e.currentTarget.grade.value,
            idnum: e.currentTarget.idnum.value,
            birthdate: e.currentTarget.birthdate.value,
            tel: e.currentTarget.tel.value,
            height: e.currentTarget.height.value,
            weight: e.currentTarget.weight.value,
            deptno: e.currentTarget.deptno.value,
            profno: e.currentTarget.profno.value,
        })).then((result) => navigate(`/studentView/${result.payload.id}`))
    }, []);

    return (
        <>
            <Spinner visible={loading} />
            {error ? (<ErrorView error={error} />) : (
                (<>
                    <form onSubmit={onSubmit}>
                        <TableEx>
                            <colgroup>
                                <col width='120' />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>name</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='name' /></td>
                                </tr>
                                <tr>
                                    <th>userid</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='userid' /></td>
                                </tr>
                                <tr>
                                    <th>grade</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='grade' /></td>
                                </tr>
                                <tr>
                                    <th>idnum</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='idnum' /></td>
                                </tr>
                                <tr>
                                    <th>birthdate</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='birthdate' /></td>
                                </tr>
                                <tr>
                                    <th>tel</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='tel' /></td>
                                </tr>
                                <tr>
                                    <th>height</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='height' /></td>
                                </tr>
                                <tr>
                                    <th>weight</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='weight' /></td>
                                </tr>
                                <tr>
                                    <th>deptno</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='deptno' /></td>
                                </tr>
                                <tr>
                                    <th>profno</th>
                                    <td className='inputWrapper'><input className='field' type='text' name='profno' /></td>
                                </tr>
                            </tbody>
                        </TableEx>
                        <div style={{ textAlign: 'center' }}>
                            <button type='submit'>저장하기</button>
                        </div>
                    </form>
                </>
                )
            )}
        </>
    );
};

export default memo(StudentAdd);