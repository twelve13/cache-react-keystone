import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Router from "next/router";

const DELETE_ACCOUNT_MUTATION = gql`
	mutation DELETE_ACCOUNT_MUTATION($id: ID!) {
		deleteAccount(id: $id) {
			id
			name
		}
	}
`;
//the apollo cache
//payload is what gets returned from the update of the mutation
function update(cache, payload)  {
	//find (identify) it then evict it
	cache.evict(cache.identify(payload.data.deleteAccount))
}

export default function DeleteAccount({ id, children }) {
	const [deleteAccount, { loading, error }] = useMutation(
		DELETE_ACCOUNT_MUTATION,
		{
			variables: { id: id},
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
			deleteAccount().catch(err => alert(err.message))
		}
		Router.push({
		pathname:`/`
		})
	}}>
		{children}
	</button>;
}