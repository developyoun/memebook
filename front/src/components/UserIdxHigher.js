import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIdxData } from '../util/action/userAction';

const UserIdxHigher = (WrappedComponent) => {
    const ComponentWithUserIdx = (props) => {
        const dispatch = useDispatch();
        const userIdx = useSelector((state) => state.meme.userIdx);

        useEffect(() => {
            dispatch(userIdxData())
        }, [userIdx]);

        return <WrappedComponent userIdx={userIdx} {...props} />;
    };

    return ComponentWithUserIdx;
};

export default UserIdxHigher;
