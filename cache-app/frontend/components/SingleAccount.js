import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import Head from "next/head";

const SINGLE_ACCOUNT_QUERY = gql`
	query SINGLE_ACCOUNT_QUERY($id: ID!) {
		Account(where: { id: $id }) {
			name
			goal
			currentAmount
		}
	}
`;

export default function SingleAccount({ id }) {
	const { data,loading, error } = useQuery (SINGLE_ACCOUNT_QUERY, {
		variables: {
			id:id
		}
	});
	if(loading) return <p>Loading...</p>
	if(error) return <DisplayError error={error}/>
	return <div>
		<Head>
			<title>{data.Account.name}</title>
		</Head>
		<h2>{data.Account.name}</h2>
	</div>
}