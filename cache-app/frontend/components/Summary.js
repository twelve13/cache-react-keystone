import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const ALL_ACCOUNTS_QUERY = gql`
query ALL_ACCOUNTS_QUERY {
  	allAccounts {
    	id
    	name
    	withdrawals {
    		amount
    		date
    	}
  	}
}
`


export default function Summary() {
	const { data, error, loading } = useQuery(ALL_ACCOUNTS_QUERY)
	//console.log(data, error, loading);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	let julyTotals = [];
	let augustTotals = [];

	let tallyWithdrawals = function(withdrawals, i) {

		let julyTotal = 0;
		withdrawals.forEach(withdrawal => {
			
			//console.log(withdrawal.date.startsWith('07', 5))
			if(withdrawal.date.startsWith('07', 5)) {
				julyTotal+= withdrawal.amount
			}
		});
		julyTotals.push(julyTotal);

		let augustTotal = 0;
		withdrawals.forEach(withdrawal => {
			
			//console.log(withdrawal.date.startsWith('08', 5))
			if(withdrawal.date.startsWith('08', 5)) {
				augustTotal+= withdrawal.amount
			}
		});
		augustTotals.push(augustTotal);
	}	
	
	
	let getTotals = data.allAccounts.map(account => {
		// account.deposits.reduce((sum, deposit) => sum + deposit.amount, 0);

		tallyWithdrawals(account.withdrawals)
	});

	// console.log(totals)


	return (
		<div>
		<table>
		<thead>
			<tr>
				<th>Month</th>
				{data.allAccounts.map(accountPassedIn => (
					<th key={accountPassedIn.id}>{accountPassedIn.name}</th>
				))}
			</tr>
			</thead>
			<tbody>
				<tr>
					<td>July</td>
					{julyTotals.map(total => (
					<td>{total}</td>
				))}
				</tr>
				<tr>
					<td>August</td>
					{augustTotals.map(total => (
					<td>{total}</td>
				))}
				</tr>
			</tbody>
		</table>			


		</div>
	);
}