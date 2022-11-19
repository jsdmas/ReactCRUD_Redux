import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorView from '../../components/ErrorView';
import Spinner from '../../components/Spinner';
import TableEx from '../../components/TableEx';
import { getCurrentData, getItem, putItem } from '../../slices/StudentSlice';

const StudentEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.StudentSlice);

    useEffect(() => {
        dispatch(getCurrentData());
    }, []);

    const item = useMemo(() => {
        if (data) {
            return data.find(v => v.id == id);
        } else {
            dispatch(getItem({ id }))
        }
    }, [data]);

    const onSubmit = useCallback(e => {
        e.preventDefault();
        dispatch(putItem({
            // edit할떄 id는 필수.
            id: e.currentTarget.id.value,
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
        })).then(result => navigate(`/studentView/${result.payload.id}`))
    }, []);
    return (
        <>
            <Spinner visible={loading} />
            {error ? (
                <ErrorView error={error} />
            ) : (
                <form onSubmit={onSubmit}>
                    {/* idididididiidididdiidiididiididiididididiididi */}
                    <input type='hidden' name='id' defaultValue={item?.id} />
                    <TableEx>
                        <colgroup>
                            <col width='120' />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>name</th>
                                <td className='inputWrapper'><input className='field' type='text' name='name' defaultValue={item?.name} /></td>
                            </tr>
                            <tr>
                                <th>userid</th>
                                <td className='inputWrapper'><input className='field' type='text' name='userid' defaultValue={item?.userid} /></td>
                            </tr>
                            <tr>
                                <th>grade</th>
                                <td className='inputWrapper'><input className='field' type='text' name='grade' defaultValue={item?.grade} /></td>
                            </tr>
                            <tr>
                                <th>idnum</th>
                                <td className='inputWrapper'><input className='field' type='text' name='idnum' defaultValue={item?.idnum} /></td>
                            </tr>
                            <tr>
                                <th>birthdate</th>
                                <td className='inputWrapper'><input className='field' type='text' name='birthdate' defaultValue={item?.birthdate} /></td>
                            </tr>
                            <tr>
                                <th>tel</th>
                                <td className='inputWrapper'><input className='field' type='text' name='tel' defaultValue={item?.tel} /></td>
                            </tr>
                            <tr>
                                <th>height</th>
                                <td className='inputWrapper'><input className='field' type='text' name='height' defaultValue={item?.height} /></td>
                            </tr>
                            <tr>
                                <th>weight</th>
                                <td className='inputWrapper'><input className='field' type='text' name='weight' defaultValue={item?.weight} /></td>
                            </tr>
                            <tr>
                                <th>deptno</th>
                                <td className='inputWrapper'><input className='field' type='text' name='deptno' defaultValue={item?.deptno} /></td>
                            </tr>
                            <tr>
                                <th>profno</th>
                                <td className='inputWrapper'><input className='field' type='text' name='profno' defaultValue={item?.profno} /></td>
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

export default memo(StudentEdit);