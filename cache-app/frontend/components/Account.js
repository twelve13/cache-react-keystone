import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import CreateDeposit from "./CreateDeposit";
import CreateWithdrawal from "./CreateWithdrawal";
import React, { useEffect, useState } from "react";


export default function Account({ thisAccount, accountProps }) {
	//thisAccount hols id, name, goal, balance
	//accountProps holds incomeSource, updateIncome function

	const [depositToggled, setDepositToggled] = useState(false);
	const [withdrawalToggled, setWithdrawalToggled] = useState(false);

	const toggleDeposit = () => {
		return setDepositToggled(!depositToggled)
	};

	const toggleWithdrawal = () => {
		return setWithdrawalToggled(!withdrawalToggled)
	}

	return (
		<div className="account-card">
			<Link href={`/account/${thisAccount.id}`}>
				<div className="account-name">{thisAccount.name}</div>

			</Link>
			<div className="account-details">
				<div>Goal: ${thisAccount.goal}</div>
				<div>Balance: ${thisAccount.balance}</div>

				<div className="account-buttons">
					<div className="deposit-button" onClick={() => setDepositToggled(!depositToggled)}>+</div>
					<div className="withdrawal-button" onClick={() => setWithdrawalToggled(!withdrawalToggled)}>-</div>
				</div>
				<CreateDeposit accountID={thisAccount.id} accountBalance={thisAccount.balance} accountProps={accountProps} depositToggled={depositToggled} toggleDeposit={toggleDeposit}/>
				<CreateWithdrawal accountID={thisAccount.id} accountBalance={thisAccount.balance} accountProps={accountProps} withdrawalToggled={withdrawalToggled} toggleWithdrawal={toggleWithdrawal}/>

				<div className="edit-account"><Link href={{
					pathname: "/update",
					query: {
						id: thisAccount.id
					}
				}}>✏️</Link></div>
			</div>
		</div>
	)
}