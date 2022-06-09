import UpdateAccount from "../components/UpdateAccount";

export default function UpdatePage({ query }) {
	return (
		<div>
			<UpdateAccount id={query.id} />
		</div>
	);
}