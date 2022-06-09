import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import DeleteAccount from "./DeleteAccount";

export default function Account({ accountProp }) {
	return (
		<div className="account-card">
			<Link href={`/account/${accountProp.id}`}>
				<div>{accountProp.name}</div>

			</Link>
			<div>Goal: {formatMoney(accountProp.goal)}</div>
			<div>Current: {accountProp.balance}</div>
			<Link href={{
				pathname: "update",
				query: {
					id: accountProp.id
				}
			}}>Edit</Link>

			<Link href="/createDeposit">Create Deposit</Link>

			<DeleteAccount id={accountProp.id}>Delete Account</DeleteAccount>
		</div>
	)
}