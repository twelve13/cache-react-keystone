//[] is a next.js thing
import SingleAccount from "../../components/SingleAccount";

export default function SingleAccountPage({ query }) {
	return <SingleAccount id={query.id} />;
}