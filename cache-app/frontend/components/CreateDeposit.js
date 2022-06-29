import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import clearForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { ALL_ACCOUNTS_QUERY } from "./Accounts";
import Router from "next/router";

const CREATE_DEPOSIT_MUTATION = gql`
mutation CREATE_DEPOSIT_MUTATION(
	# Which variables are getting passed in? and What types are they?
	# ! makes it required
	$description: String!
	$amount: Int
	$date: String
	$accountID: ID!
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
	console.log(thisAccount.accountID);
	//from the useForm custom hook
	const { inputs, handleChange, clearForm } = useForm({
		description: "Test deposit",
		amount: 123,
		date: "today",
	});
	const [createDeposit, { loading, error, data }] = useMutation(CREATE_DEPOSIT_MUTATION, {
		//variables: inputs,
		variables: { 
			description: inputs.description,
			amount: inputs.amount,
			date: inputs.date,
			accountID: thisAccount.accountID
		},
		//so it'll show up on the homepage immediately after creating
		refetchQueries: [{ query: ALL_ACCOUNTS_QUERY }]
	});
	return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			//console.log(inputs);
			//submit the input fields to the backend:
			const res = await createDeposit();
			//console.log(res);
			// Router.push({
			// 	pathname:`/account/${res.data.createDeposit.id}`
			// })
		}}>
			<DisplayError error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
			<label htmlFor="name">
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
			<label htmlFor="date">
				Date
				<input 
					type="text" 
					id="date" 
					name="date" 
					placeholder="enter date"
					value={inputs.date}
					onChange={handleChange}
				 />
			</label>
			</fieldset>
			<button type="submit">Deposit</button>
		</form>
	)
}