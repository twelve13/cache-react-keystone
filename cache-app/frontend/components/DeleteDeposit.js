import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Router from "next/router";

//delete the deposit and subtract that from the account's balance
const DELETE_DEPOSIT_MUTATION = gql`
	mutation DELETE_DEPOSIT_MUTATION(
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
			deposits {
				id
				description
			}
		}
		deleteDeposit(id: $id) {
			id
			description
		}
	}
`;
//the apollo cache
//payload is what gets returned from the update of the mutation
function update(cache, payload) {
	//find (identify) it then evict it
	cache.evict(cache.identify(payload.data.deleteDeposit))
};

export default function DeleteDeposit({ id, accountId, accountBalance, depositAmount }) {
	const [deleteDeposit, { loading, error }] = useMutation(
		DELETE_DEPOSIT_MUTATION,
		{
			variables: { 
				id: id,
				accountId: accountId,
				balance: accountBalance - depositAmount
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
			deleteDeposit().catch(err => alert(err.message))
		}
	}}>Delete
	</button>;
}