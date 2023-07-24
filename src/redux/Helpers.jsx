import { useSelector } from "react-redux";

const getStoredData = (reducerName) => {
  const getPending = useSelector((state) => state[reducerName].pending);

  const getData = useSelector((state) => state[reducerName].data);

  const getError = useSelector((state) => state[reducerName].error);

  return {
    data: getData,
    pending: getPending,
    error: getError,
  };
};

export default getStoredData;
