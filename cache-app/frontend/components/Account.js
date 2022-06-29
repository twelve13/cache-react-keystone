import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import CreateDeposit from "./CreateDeposit";
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

				<CreateDeposit accountID={accountProp.id}/>

				<DeleteAccount id={accountProp.id}>Delete Account</DeleteAccount>
			</div>
		</div>
	)
}