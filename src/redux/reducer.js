import auth from './auth/reducer';
import user from './user/reducer';
import onboarding from './onboarding/reducer';
import dashboard from './dashboard/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth,
    user,
    onboarding,
    dashboard
});

export default rootReducer;