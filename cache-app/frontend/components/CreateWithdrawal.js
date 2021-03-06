import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import clearForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { ALL_ACCOUNTS_QUERY } from "./Accounts";
import Router from "next/router";

//https://v5.keystonejs.com/keystonejs/fields/src/types/relationship/
const CREATE_WITHDRAWAL_MUTATION = gql`
mutation CREATE_WITHDRAWAL_MUTATION(
	# Which variables are getting passed in? and What types are they?
	# ! makes it required
	$description: String!
	$amount: Int!
	$date: String!
	$accountID: ID!
	$balance: Int!
) {
	updateAccount(
		id: $accountID,
		data: {
			withdrawals: {
				create: {
					description: $description,
					amount: $amount,
					date: $date
				}
			}
			balance: $balance

		}
	) {
		withdrawals {
			id
			description
			amount
			date
		}
	}
}
`;


//the accountID is passed in from the Account component
export default function CreateWithdrawal(thisAccount) {

	const { inputs, handleChange, clearForm } = useForm({
		description: "",
		amount: 0,
		date: ""
	});
	const [createWithdrawal, { loading, error, data }] = useMutation(CREATE_WITHDRAWAL_MUTATION, {
		//variables: inputs,
		variables: { 
			description: inputs.description,
			amount: inputs.amount,
			date: inputs.date,
			accountID: thisAccount.accountID,
			balance: thisAccount.accountBalance - inputs.amount
		},
		//so it'll show up on the homepage immediately after creating
		refetchQueries: [{ query: ALL_ACCOUNTS_QUERY }]
	});

	return (
		<div>
		<form className={thisAccount.withdrawalToggled ? "show-form" : "hide-form"} onSubmit={async (e) => {
			e.preventDefault();
			if(inputs.amount > thisAccount.accountBalance){
				alert("withdrawal amount is greater than account balance");
				return;
			}
			const res = await createWithdrawal();
		}}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
			<label htmlFor="amount">
				Amount
				<input 
					type="number" 
					id="amount" 
					name="amount" 
					placeholder="enter amount"
					value={inputs.amount}
					onChange={handleChange}
				 />
			</label>
			<label htmlFor="description">
				Description
				<input 
					type="text" 
					id="description" 
					name="description" 
					placeholder="enter description"
					value={inputs.description}
					onChange={handleChange}
				 />
			</label>
			<label htmlFor="date">
				Date
				<input 
					type="date" 
					id="date" 
					name="date" 
					placeholder="enter date"
					value={inputs.date}
					onChange={handleChange}
				 />
			</label>
			</fieldset>
			<button onClick={thisAccount.toggleWithdrawal} type="submit">Submit</button>
		</form>
		</div>
	)
}