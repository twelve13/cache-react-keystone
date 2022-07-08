import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";
import DeleteAccount from "./DeleteAccount";
import Deposit from "./Deposit";
import Withdrawal from "./Withdrawal";

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
	return <div className="single-account">
		<Head>
			<title>{data.Account.name}</title>
		</Head>
		<header>
			<h2>{data.Account.name}</h2>
			<DeleteAccount id={id}>Delete Account</DeleteAccount>
		</header>
		<div>Balance: ${data.Account.balance}</div>

		<div className="deposits-header">
			<div>Withdrawals</div>
			<div>Amount</div>
			<div>Date</div>
		</div>
		{data.Account.withdrawals.map(withdrawal => (
			<Withdrawal key={withdrawal.id} withdrawal={withdrawal} accountBalance={data.Account.balance}></Withdrawal>
		))}

		<div className="deposits-header">
			<div>Deposits</div>
			<div>Amount</div>
			<div>Date</div>
		</div>
		{data.Account.deposits.map(deposit => (
			<Deposit key={deposit.id} deposit={deposit} accountId={id} accountBalance={data.Account.balance}></Deposit>
		))}
		
		
	
	</div>
}