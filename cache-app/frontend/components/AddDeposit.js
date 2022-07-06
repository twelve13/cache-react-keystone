// import gql from "graphql-tag";
// import { useMutation, useQuery } from "@apollo/client";
// import DisplayError from "./ErrorMessage";
// import useForm from "../lib/useForm";

// const SINGLE_ACCOUNT_QUERY = gql`
// 	query SINGLE_ACCOUNT_QUERY($id: ID!) {
// 		Account(where: { id: $id }) {
// 			id
// 			name
// 			goal
// 			balance
// 		}
// 	}
// `;

// const UPDATE_ACCOUNT_MUTATION = gql`
// 	mutation UPDATE_ACCOUNT_MUTATION(
// 		$id: ID!
// 		$name: String
// 		$goal: Int 
// 		$balance: Int 
// 	) {
// 		updateAccount(
// 			id: $id,
// 			data: {
// 				name: $name,
// 				goal: $goal,
// 				balance: $currentAmount
// 			}
// 		) {
// 			id
// 			name
// 			goal
// 			balance
// 		}
// 	}
// `;

// export default function UpdateAccount({ id }) {
// 	const [toggled, setToggled] = useState(false);

// 	//1. We need to get the existing product
// 	const { data, error, loading } = useQuery (SINGLE_ACCOUNT_QUERY, {
// 		variables: { id: id}
// 	});


// 	//2. We need to get the mutation to update the product
// 	//since data, error, and loading were already declared above, can rename as you destructure
// 	const [updateAccount, {data: updateData, error: updateError, loading: updateLoading }] = useMutation (UPDATE_ACCOUNT_MUTATION);
// 	//2.5 Create some state for the form inputs:
// 		const { inputs, handleChange, clearForm } = useForm(data?.Account);
// 		if (loading) return <p>loading...</p>
// 	//3. We need the form to handle the updates
// 	return (
// 		<div>testingggg
// 		<div onClick={() => setToggled(!toggled)}>ADD</div>
// 		<form className={this.state.toggled ? "show-form" : "hide-form"} onSubmit={async (e) => {
// 			e.preventDefault();
// 			const res = await updateAccount({
// 				variables: {
// 					id: id,
// 					name: inputs.name,
// 					goal: inputs.goal,
// 					balance: inputs.balance
					
// 				}
// 			});
// 		}}>
// 			<DisplayError error={error || updateError} />
// 			<fieldset disabled={updateLoading} aria-busy={updateLoading}>
// 			<label htmlFor="name">
// 				Name
// 				<input 
// 					type="text" 
// 					id="name" 
// 					name="name" 
// 					placeholder="enter name"
// 					value={inputs.name}
// 					// onChange={(e) => {
// 					// 	setName(e.target.value);
// 					// }}
// 					onChange={handleChange}
// 				 />
// 			</label>
// 			<label htmlFor="goal">
// 				Goal amount
// 				<input 
// 					type="number" 
// 					id="goal" 
// 					name="goal" 
// 					placeholder="enter goal amount"
// 					value={inputs.goal}
// 					// onChange={(e) => {
// 					// 	setName(e.target.value);
// 					// }}
// 					onChange={handleChange}
// 				 />
// 			</label>
// 			<label htmlFor="goal">
// 				Current amount
// 				<input 
// 					type="number" 
// 					id="currentAmount" 
// 					name="currentAmount" 
// 					placeholder="enter current amount"
// 					value={inputs.currentAmount}
// 					// onChange={(e) => {
// 					// 	setName(e.target.value);
// 					// }}
// 					onChange={handleChange}
// 				 />
// 			</label>
// 			</fieldset>
// 			{/*<button type="button" onClick={clearForm}>Clear Form</button>*/}
// 			<button type="submit">Update Account</button>
// 		</form>
// 		<div>
// 	)
// }