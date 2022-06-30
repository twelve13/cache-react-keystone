import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import CreateDeposit from "./CreateDeposit";


export default function Account({ accountProp, updateIncome }) {
	return (
		<div className="account-card">
			<Link href={`/account/${accountProp.id}`}>
				<div className="account-name">{accountProp.name}</div>

			</Link>
			<div className="account-details">
				<div>Goal: ${accountProp.goal}</div>
				<div>Balance: ${accountProp.balance}</div>


				<CreateDeposit accountID={accountProp.id} accountBalance={accountProp.balance} updateIncome={updateIncome} />

				<div><Link href={{
					pathname: "/update",
					query: {
						id: accountProp.id
					}
				}}>✏️</Link></div>
			</div>
		</div>
	)
}