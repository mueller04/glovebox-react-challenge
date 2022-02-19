import {useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'
import provider from '../data/provider'
import Form from './Form'

const Page = ({showPolicyForm, setPolicies, setPolicyTypes, setShowPolicyForm}) => {

	const defaultPolicyForm = {selectedPolicy: {policyType: '', policyNum: ''}}

	const [policyForm, setPolicyForm] = useState(defaultPolicyForm);
	const [lastEditRecordId, setLastEditRecordId] = useState();

	const policies = useSelector((state) => state.policies)
	const policyTypes = useSelector((state) => state.policyTypes)

	useEffect(()=>{
		(async ()=>{
			const policies = await provider.getPolicies()
			const policyTypes = await provider.getPolicyTypes()

			// store these policies in redux and make them available to the Page component with useSelector
			setPolicies(policies)
			setPolicyTypes(policyTypes)
		})()
	})

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

	const showForm = (recordId, policyType, policyNum) => {

		if (lastEditRecordId === recordId && showPolicyForm) {
			setShowPolicyForm(false)
			setPolicyForm(defaultPolicyForm)
		} else {
			setShowPolicyForm(true)
			setPolicyForm({
				selectedPolicy: {policyType, policyNum}
			})
		}

		setLastEditRecordId(recordId)
	}

	const carrierPolicyMap = createPolicyMap(policies)

	return (
		<div className="page">
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

			{
				showPolicyForm ? 
				<Form selectedPolicy={policyForm.selectedPolicy} policyTypes={policyTypes}></Form> : 
				null
			}
		</div>
	)
}

const mapStateToProps = state => {
	return {showPolicyForm: state.showPolicyForm}
}

const mapDispatchToProps = dispatch => ({
	setPolicies: (policies) => {
		dispatch({type: "SET_POLICIES",  payload: policies})
	},
	setPolicyTypes: (policyTypes) => {
		dispatch({type: "SET_POLICY_TYPES",  payload: policyTypes})
	},
	setShowPolicyForm: (show) => {
		dispatch({type: "SET_SHOW_POLICY_FORM",  payload: show})
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)