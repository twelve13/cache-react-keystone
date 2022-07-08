import formatMoney from "../lib/formatMoney";
import DeleteWithdrawal from "./DeleteWithdrawal";

export default function Withdrawal(withdrawal) {
	return (
			<div className="deposit-details">
				<div>{withdrawal.withdrawal.description}</div>	
				<div>{formatMoney(withdrawal.withdrawal.amount)}</div>
				<div>{withdrawal.withdrawal.date}</div>
				<DeleteWithdrawal id={withdrawal.withdrawal.id} accountId={withdrawal.accountId} accountBalance={withdrawal.accountBalance} withdrawalAmount={withdrawal.withdrawal.amount}>Delete</DeleteWithdrawal>
			</div>
	)
}