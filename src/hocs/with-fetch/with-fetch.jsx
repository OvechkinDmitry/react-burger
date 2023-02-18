import React, {useEffect} from 'react';
import WarnLog from "../../components/ui/warn-log/warn-log";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

const WithFetch = (WrappedComponent, callback) => {
    const dispatch = useDispatch()
    const {isLoading, isError, data} = useSelector(state => state.ingredientsReducer)
    useEffect(() => {
        dispatch(callback)
    }, [callback])
    return (<>
            {isLoading && <WarnLog>Загрузка...</WarnLog>}
            {isError && <WarnLog>Ошибка</WarnLog>}
            {!isError && !isLoading && Object.keys(data).length && (<>
                <WrappedComponent info={data}/>
            </>)}
        </>
    );
};

WithFetch.propTypes = {
    WrappedComponent: PropTypes.element.isRequired,
    callback: PropTypes.func.isRequired
}

export default WithFetch;