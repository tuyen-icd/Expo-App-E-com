import { useSelector } from "react-redux"
import { AppState } from "./reducers/RootReducer";

const getStoreData = (reducerName: any) => {
    const getPending = useSelector((state: any) => state[reducerName].pending);

    const getData = useSelector((state: any) => state[reducerName].data);

    const getError = useSelector((state: any) => state[reducerName].error);

    return {
        data: getData, getPending: getPending, error: getError
    };
};

export default getStoreData;