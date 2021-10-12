import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../store/reducers/ac";


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}