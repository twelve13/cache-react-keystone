import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Router from "next/router";

//delete the withdrawal and add the amount to the account's balance
const DELETE_WITHDRAWAL_MUTATION = gql`
	mutation DELETE_WITHDRAWAL_MUTATION(
		$id: ID!
		$accountId: ID!
		$balance: Int!
		) {
		updateAccount(
			id: $accountId,
			data : {
				balance: $balance
			}
		) {
			withdrawals {
				id
				description
			}
		}
		deleteWithdrawal(id: $id) {
			id
			description
		}
	}
`;
//the apollo cache
//payload is what gets returned from the update of the mutation
function update(cache, payload) {
	//find (identify) it then evict it
	cache.evict(cache.identify(payload.data.deleteWithdrawal))
};

export default function DeleteWithdrawal({ id, accountId, accountBalance, withdrawalAmount }) {
	const [deleteWithdrawal, { loading, error }] = useMutation(
		DELETE_WITHDRAWAL_MUTATION,
		{
			variables: { 
				id: id,
				accountId: accountId,
				balance: accountBalance + withdrawalAmount
			},
			update: update
		}
	);

	return <button 
		type="button" 
		disabled={loading}
		onClick={() => {
		//the confirm returns a true or false
		if (confirm("Are you sure you want to delete this item?")) {
			//if confirmed go ahead and delete it
			deleteWithdrawal().catch(err => alert(err.message))
		}
	}}>Delete
	</button>;
}