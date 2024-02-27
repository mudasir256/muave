import { ONBOARDING_ACTIONS } from "./constants";
import {
    getOnboarding,
    postOnboarding,
    getStep1,
    postStep1,
    getStep2,
    postStep2,
    getStep3,
    postStep3,
    getStep4,
    postStep4,
    getStep5,
    postStep5,
    getStep6,
    postStep6,
    getStep7,
    postStep7
} from "./service";

export const getOnboardingAction = () => {
    return async (dispatch) => {
        try {
            const response = await getOnboarding();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.ONBOARDING_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postOnboardingAction = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postOnboarding(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.ONBOARDING_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}


export const getStep1Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep1();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_ONE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep1Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep1(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_ONE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}


export const getStep2Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep2();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_TWO_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep2Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep2(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_TWO_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}


export const getStep3Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep3();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_THREE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep3Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep3(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_THREE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}


export const getStep4Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep4();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_FOUR_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep4Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep4(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_FOUR_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const getStep5Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep5();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_FIVE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep5Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep5(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_FIVE_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const getStep6Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep6();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_SIX_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep6Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep6(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_SIX_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const getStep7Action = () => {
    return async (dispatch) => {
        try {
            const response = await getStep7();
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_SEVEN_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}

export const postStep7Action = (obj) => {
    return async (dispatch) => {
        try {
            const response = await postStep7(obj);
            if (response) {
                dispatch({
                    type: ONBOARDING_ACTIONS.STEP_SEVEN_DATA,
                    payload: response
                })
            }
        }
        catch (error) {
            return error;
        }
    }
}