import {useSelector} from 'react-redux'

const Carriers = ({showForm}) => {

    const styles = {
        main: {
          margin: 0,
          padding: 0,
          display: 'flex',
          listStyleType: 'none'
       },
       row: {
          margin: '1rem',
          padding: '5px',
          borderRadius: '7pt',
          background: '#87dbff',
          flex: 6,
          order: 2,
          flexDirection: 'column'
       },
       button: {
          display: 'flex',
          justifyContent: 'center',
          margin: '4px',
          padding: '5px',
          borderRadius: '20pt',
          background: '#629cb5',
       }
     }

	const policies = useSelector((state) => state.policies)

    const createPolicyMap = (policies) => {
		const carrierPolicyMap = new Map()

		policies.forEach(policy => {

			if (!carrierPolicyMap.get(policy.carrierID)) {
				carrierPolicyMap.set(policy.carrierID, [])
			}
	
			carrierPolicyMap.get(policy.carrierID).push({
				policyNumber: policy.policyNumber,
				type: policy.type,
				primaryHolder: policy.primaryHolder,
				agencyName: policy.agencyName
			})
		})
		return carrierPolicyMap
	}

	const carrierPolicyMap = createPolicyMap(policies)

	return (
        <div>
            <h2>Carriers</h2>

            {[...carrierPolicyMap].map(carrierPolicies => {
                const carrierId = carrierPolicies[0]
                const policies = carrierPolicies[1]

                const policyTableRows = policies.map(policy => {
                    const policyNum = policy.policyNumber
                    const policyTypeId = policy.type.id
                    const key = policyNum + policyTypeId
                    const primaryHolder = policy.primaryHolder
                    return (
                            <li key={key} style={styles.row}>
                                <div>
                                    {policyNum}, {policy.type.name}, {primaryHolder.firstName} {primaryHolder.lastName}, {policy.agencyName} 
                                </div>
                                <div style={styles.button}>
                                    <button onClick={() => showForm(key, policyTypeId, policyNum)}>Edit</button>
                                </div>
                            </li>
                    )	
                })

                return (
                    <div key={carrierId}>
                        <h3>{carrierId}</h3>
                        <ul style={styles.main}>{policyTableRows}</ul>
                    </div>
                )
            })}
        </div>)
}



export default Carriers
