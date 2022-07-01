import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import clearForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { ALL_ACCOUNTS_QUERY } from "./Accounts";
import Router from "next/router";

//https://v5.keystonejs.com/keystonejs/fields/src/types/relationship/
const CREATE_DEPOSIT_MUTATION = gql`
mutation CREATE_DEPOSIT_MUTATION(
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
			deposits: {
				create: {
					description: $description,
					amount: $amount,
					date: $date
				}
			}
			balance: $balance

		}
	) {
		deposits {
			id
			description
			amount
			date
		}
	}
}
`;


//the accountID is passed in from the Account component
export default function CreateDeposit(thisAccount) {
	//console.log(thisAccount)
	const updateIncome = () => {
		thisAccount.accountProps.updateIncome(inputs.amount);
	}

	const { inputs, handleChange, clearForm } = useForm({
		description: "",
		amount: 0,
		date: ""
	});

	const today = new Date();

	const [createDeposit, { loading, error, data }] = useMutation(CREATE_DEPOSIT_MUTATION, {
		variables: { 
			description: thisAccount.accountProps.incomeSource,
			amount: inputs.amount,
			//use current date
			date: today,
			accountID: thisAccount.accountID,
			balance: thisAccount.accountBalance + inputs.amount
		},
		//so it'll show up on the homepage immediately after creating
		refetchQueries: [{ query: ALL_ACCOUNTS_QUERY }]
	});

	return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			updateIncome();
			const res = await createDeposit();
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
			</fieldset>
			<button type="submit">Submit</button>
		</form>
	)
}