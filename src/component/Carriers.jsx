import {useSelector} from 'react-redux'

const Carriers = ({showForm}) => {

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

	return (<>
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
                    <li key={key}>
                        {policyNum}, {policy.type.name}, {primaryHolder.firstName} {primaryHolder.lastName}, {policy.agencyName} 
                        <button onClick={() => showForm(key, policyTypeId, policyNum)}>Edit</button>
                    </li>
                )	
            })

            return (
                <div key={carrierId}>
                    <h3>{carrierId}</h3>
                    <ul>{policyTableRows}</ul>
                </div>
            )
        })}
    </>)
}



export default Carriers
