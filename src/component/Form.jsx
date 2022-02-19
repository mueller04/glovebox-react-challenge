import {useEffect, useState} from 'react'
import {connect} from 'react-redux'


const Form = ({selectedPolicy, policyTypes, setPolicyTypeForRecord}) => {

	const [currentPolicy, setCurrentPolicy] = useState(selectedPolicy);
	const [newPolicyTypeId, setNewPolicyTypeId] = useState(selectedPolicy.policyType);

    useEffect(() => {
        setNewPolicyTypeId(selectedPolicy.policyType)
    }, [selectedPolicy.policyType])

    useEffect(() => {
        setCurrentPolicy(selectedPolicy)
    }, [selectedPolicy])

    const handleOnChange = (e) => {
        console.log(e.target.value)
        const newPolicyTypeId = e.target.value
        setNewPolicyTypeId(newPolicyTypeId)
        console.log(newPolicyTypeId)
        setPolicyTypeForRecord(newPolicyTypeId, currentPolicy)
      }


    return (
        <select value={newPolicyTypeId} onChange={handleOnChange}>
            {policyTypes.map(policyType => { 
            return (
                <option 
                key={policyType.id} 
                value={policyType.id}
                >{policyType.name}</option>
            );
            })}
        </select>
    )
}

const mapDispatchToProps = dispatch => ({
	setPolicyTypeForRecord: (type, currentPolicy) => {
		dispatch({type: "SET_POLICY_TYPE_FOR_RECORD",  payload: {type, currentPolicy}})
	}
})

export default connect(null, mapDispatchToProps)(Form)