import {createStore} from 'redux'

const initialState = {
    policies: [],
    policyTypes: [], 
    showPolicyForm: false
}

// add reducers here
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_POLICIES": {
            return {
                ...state,
                policies: action.payload
            }
        }
        case "SET_POLICY_TYPES": {
            return {
                ...state,
                policyTypes: action.payload
            }
        }
        case "SET_POLICY_TYPE_FOR_RECORD": {

            const currentPolicy = action.payload.currentPolicy

            const matchingRecord = (policy) => { 
                return currentPolicy.policyType === policy.type.id 
                && currentPolicy.policyNum === policy.policyNumber
            }

            const updatedPolicies = [...state.policies]

            const policyToEdit = updatedPolicies.find(policy => {
                return matchingRecord(policy)
            })

            const newPolicyType = state.policyTypes.find(policyType => {
                return policyType.id === action.payload.type
            })

            policyToEdit.type = newPolicyType

            return {
                ...state,
                policies: updatedPolicies,
                showPolicyForm: false
            }
        }
        case "SET_SHOW_POLICY_FORM": {
            return {
                ...state,
                showPolicyForm: action.payload
            }
        }
        default: 
            return state
    }
}

export default createStore(reducer)