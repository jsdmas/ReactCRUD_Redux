import React, { memo } from 'react';
import PropTypes from 'prop-types';

/** 로딩바 컴포넌트 */
// --> https://mhnpd.github.io/react-loader-spinner


import { Blocks } from 'react-loader-spinner';

const Spinner = ({ visible, width, height }) => {
    return (
        <>
            {visible && (
                <Blocks
                    height={height}
                    width={width}
                    ariaLabel="blocks-loading"
                    wrapperStyle={{
                        position: 'absolute',
                        zIndex: 9999,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    wrapperClass="blocks-wrapper"
                />)}
        </>
    );
};

/** 기본값 정의 */
Spinner.defaultProps = {
    visible: false,
    width: 100,
    height: 100
};

/** 데이터 타입 설정 */
Spinner.propTypes = {
    visible: PropTypes.bool.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

export default memo(Spinner);