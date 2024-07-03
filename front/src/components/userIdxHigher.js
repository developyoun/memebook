import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userIdxData } from "../util/action/userAction";

const useIdxHigher = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();
        const userIdx = useSelector(state => state.meme.userIdx);

        useEffect(() => {
            dispatch(userIdxData());
            console.log(userIdx)
        }, [dispatch]);

        return <WrappedComponent userIdx={userIdx} {...props} />;
    };
};

export default useIdxHigher;
