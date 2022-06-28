import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import DeleteAccount from "./DeleteAccount";

export default function Account({ accountProp }) {
	return (
		<div className="account-card">
			<Link href={`/account/${accountProp.id}`}>
				<div className="account-name">{accountProp.name}</div>

			</Link>
			<div className="account-details">
				<div>Goal: {formatMoney(accountProp.goal)}</div>
				<div>Balance: {accountProp.balance}</div>
				<div><Link href={{
					pathname: "update",
					query: {
						id: accountProp.id
					}
				}}>Edit</Link></div>

				<Link href="/createDeposit">Create Deposit</Link>

				<DeleteAccount id={accountProp.id}>Delete Account</DeleteAccount>
			</div>
		</div>
	)
}