import { ONBOARDING_ACTIONS } from "./constants";

const initialState = {
    onboardingData: null,
    stepOne: null,
    stepTwo: null,
    stepThree: null,
    stepFour: null,
    stepFive: null,
    stepSix: null,
    stepSeven: null,
    loading: false
}

const onboarding = (state = initialState, action) => {
    switch (action.type) {

        case ONBOARDING_ACTIONS.ONBOARDING_DATA: {
            return {
                ...state,
                onboardingData: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_ONE_DATA: {
            return {
                ...state,
                stepOne: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_TWO_DATA: {
            return {
                ...state,
                stepTwo: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_THREE_DATA: {
            return {
                ...state,
                stepThree: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_FOUR_DATA: {
            return {
                ...state,
                stepFour: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_FIVE_DATA: {
            return {
                ...state,
                stepFive: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_SIX_DATA: {
            return {
                ...state,
                stepSix: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.STEP_SEVEN_DATA: {
            return {
                ...state,
                stepSeven: action.payload,
                loading: false
            }
        }

        case ONBOARDING_ACTIONS.SET_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        default:
            return state;
    }
}

export default onboarding;