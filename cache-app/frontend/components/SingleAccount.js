import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";
import DeleteAccount from "./DeleteAccount";

const SINGLE_ACCOUNT_QUERY = gql`
	query SINGLE_ACCOUNT_QUERY($id: ID!) {
		Account(where: { id: $id }) {
			name
			goal
			balance
			deposits {
				id
				description
				amount
				date
			}
			withdrawals {
				id
				description
				amount
				date
			}
		}
	}
`;

export default function SingleAccount({ id }) {
	const { data,loading, error } = useQuery (SINGLE_ACCOUNT_QUERY, {
		variables: {
			id:id
		}
	});
	// console.log(data);
	if(loading) return <p>Loading...</p>
	if(error) return <DisplayError error={error}/>
	return <div>
		<Head>
			<title>{data.Account.name}</title>
		</Head>
		<h2>{data.Account.name}</h2>
		<div>Balance: {data.Account.balance}</div>

		<div className="deposits-header">
			<div>Item Description</div>
			<div>Amount</div>
			<div>Date</div>
		</div>
		{data.Account.withdrawals.map(withdrawal => (
			<div key={withdrawal.id} className="deposit-details">
				<div>{withdrawal.description}</div>	
				<div>{formatMoney(withdrawal.amount)}</div>
				<div>{withdrawal.date}</div>
			</div>
		))}

		<div className="deposits-header">
			<div>Item Description</div>
			<div>Amount</div>
			<div>Date</div>
		</div>
		{data.Account.deposits.map(deposit => (
			<div key={deposit.id} className="deposit-details">
				<div>{deposit.description}</div>	
				<div>{formatMoney(deposit.amount)}</div>
				<div>{deposit.date}</div>
			</div>
		))}
		
		<DeleteAccount id={id}>Delete Account</DeleteAccount>
	
	</div>
}