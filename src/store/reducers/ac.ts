import {AuthActionCreators} from "./auth/ac";
import {EventActionCreators} from "./event/ac";

export const ActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}