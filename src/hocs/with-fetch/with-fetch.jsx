import React, {useEffect, useState} from 'react';
import {fetchIngredients} from "../../utils/fetch-ingredients";
import WarnLog from "../../components/ui/warn-log/warn-log";

const WithFetch = (WrappedComponent, url) => {
    const [state, setState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    useEffect(() => {
        fetchIngredients(url, state, setState)
    }, [url])
    const {isLoading, hasError, data} = state
    return (<>
            {isLoading && <WarnLog>Загрузка...</WarnLog>}
            {hasError && <WarnLog>Ошибка</WarnLog>}
            {!hasError && !isLoading && Object.keys(data).length && (<>
                <WrappedComponent data={data}/>
            </>)}
            </>
    );
};

export default WithFetch;