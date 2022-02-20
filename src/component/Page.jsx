import {useEffect, useState} from 'react'
import {connect, useSelector} from 'react-redux'
import provider from '../data/provider'
import Form from './Form'
import Carriers from './Carriers'

const Page = ({showPolicyForm, setShowPolicyForm, setPolicies, setPolicyTypes}) => {

	const defaultPolicyForm = {selectedPolicy: {policyType: '', policyNum: ''}}

	const [policyForm, setPolicyForm] = useState(defaultPolicyForm);
	const [lastEditRecordId, setLastEditRecordId] = useState();

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

	return (
		<div className="page">
		
			<Carriers showForm={showForm}></Carriers>

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