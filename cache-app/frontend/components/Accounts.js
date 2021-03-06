import { useQuery } from "@apollo/client";
import Account from "./Account";
import gql from "graphql-tag";

export const ALL_ACCOUNTS_QUERY = gql`
query ALL_ACCOUNTS_QUERY {
  	allAccounts {
    	id
    	name
    	goal
    	balance
  	}
}
`
//accountProps holds incomeSource and updateIncome function

export default function Accounts(accountProps) {
	const { data, error, loading } = useQuery(ALL_ACCOUNTS_QUERY)
	//console.log(data, error, loading);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<div className="accounts-grid">
			{data.allAccounts.map(accountPassedIn => (
				<Account key={accountPassedIn.id} thisAccount={accountPassedIn} accountProps={accountProps}/>
			))}
		</div>
	);
}