import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/ItemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () =>{
const fetchStatus=useSelector(store=>store.fetchStatus);
const dispatch = useDispatch();


useEffect(()=>{
  if(fetchStatus.fetchDone ) return;

  const controller = new AbortController();
  const signal = controller.signal;
  dispatch(fetchStatusActions.markFetchingStarted());
  fetch("http://localhost:8080/items",{signal})
  .then((res) => res.json())
  .then((data)=> {
     dispatch(fetchStatusActions.markFetchDone());
      dispatch(fetchStatusActions.markFetchingFinished());
    dispatch(itemsActions.addInitialItems(data.items));
  });

  return ()=>{
    controller.abort();
  };
},[fetchStatus]);


return<></>
}
export default FetchItems;