//import { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import clearForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { ALL_ACCOUNTS_QUERY } from "./Accounts";
import Router from "next/router";

const CREATE_ACCOUNT_MUTATION = gql`
mutation CREATE_ACCOUNT_MUTATION(
	# Which variables are getting passed in? and What types are they?
	# ! makes it required
	$name: String!
	$goal: Int
	$balance: Int
) {
	createAccount(
		data:{
			name: $name,
			goal: $goal
			balance: $balance
		}
	) {
		id
		goal
		balance
	}
	}
`;

export default function CreateAccount() {
	//const [name, setName] = useState("Caroline");
	//from the useForm custom hook
	const { inputs, handleChange, clearForm } = useForm({
		name: "Caroline1",
		goal: 123,
		balance: 25
	});
	const [createAccount, { loading, error, data }] = useMutation(CREATE_ACCOUNT_MUTATION, {
		variables: inputs,
		//so it'll show up on the homepage immediately after creating
		refetchQueries: [{ query: ALL_ACCOUNTS_QUERY }]
	});
	return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			//console.log(inputs);
			//submit the input fields to the backend:
			const res = await createAccount();
			//console.log(res);
			//await createAccount();
			Router.push({
				pathname:`/account/${res.data.createAccount.id}`
			})
		}}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
			<label htmlFor="name">
				Name
				<input 
					type="text" 
					id="name" 
					name="name" 
					placeholder="enter name"
					value={inputs.name}
					// onChange={(e) => {
					// 	setName(e.target.value);
					// }}
					onChange={handleChange}
				 />
			</label>
			<label htmlFor="goal">
				Goal amount
				<input 
					type="number" 
					id="goal" 
					name="goal" 
					placeholder="enter goal amount"
					value={inputs.goal}
					// onChange={(e) => {
					// 	setName(e.target.value);
					// }}
					onChange={handleChange}
				 />
			</label>
			<label htmlFor="goal">
				Current amount
				<input 
					type="number" 
					id="balance" 
					name="balance" 
					placeholder="enter current amount"
					value={inputs.balance}
					// onChange={(e) => {
					// 	setName(e.target.value);
					// }}
					onChange={handleChange}
				 />
			</label>
			</fieldset>
			{/*<button type="button" onClick={clearForm}>Clear Form</button>*/}
			<button type="submit">Add Account</button>
		</form>
	)
}