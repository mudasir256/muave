import auth from './auth/reducer';
import user from './user/reducer';
import onboarding from './onboarding/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth,
    user,
    onboarding
});

export default rootReducer;