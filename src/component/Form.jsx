import {useEffect, useState} from 'react'
import {connect} from 'react-redux'


const Form = ({selectedPolicy, policyTypes, setPolicyTypeForRecord}) => {

    const styles = {
       select: {
          display: 'flex',
          justifyContent: 'center',
          margin: '4px',
          padding: '5px',
          borderRadius: '20pt',
          width: '20rem',
          height: '2.5rem',
          background: '#629cb5',
       }
     }

	const [currentPolicy, setCurrentPolicy] = useState(selectedPolicy);
	const [newPolicyTypeId, setNewPolicyTypeId] = useState(selectedPolicy.policyType);

    useEffect(() => {
        setNewPolicyTypeId(selectedPolicy.policyType)
    }, [selectedPolicy.policyType])

    useEffect(() => {
        setCurrentPolicy(selectedPolicy)
    }, [selectedPolicy])

    const handleOnChange = (e) => {
        const newPolicyTypeId = e.target.value
        setNewPolicyTypeId(newPolicyTypeId)
        setPolicyTypeForRecord(newPolicyTypeId, currentPolicy)
      }


    return (
        <select value={newPolicyTypeId} onChange={handleOnChange} style={styles.select}>
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