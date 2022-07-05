import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import CreateDeposit from "./CreateDeposit";
import CreateWithdrawal from "./CreateWithdrawal"


export default function Account({ thisAccount, accountProps }) {
	//thisAccount hols id, name, goal, balance
	//accountProps holds incomeSource, updateIncome function
	return (
		<div className="account-card">
			<Link href={`/account/${thisAccount.id}`}>
				<div className="account-name">{thisAccount.name}</div>

			</Link>
			<div className="account-details">
				<div>Goal: ${thisAccount.goal}</div>
				<div>Balance: ${thisAccount.balance}</div>


				<CreateDeposit accountID={thisAccount.id} accountBalance={thisAccount.balance} accountProps={accountProps} />
				<CreateWithdrawal accountID={thisAccount.id} accountBalance={thisAccount.balance} accountProps={accountProps} />

				<div><Link href={{
					pathname: "/update",
					query: {
						id: thisAccount.id
					}
				}}>✏️</Link></div>
			</div>
		</div>
	)
}