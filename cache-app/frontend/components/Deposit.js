import formatMoney from "../lib/formatMoney";
import DeleteDeposit from "./DeleteDeposit";

export default function Deposit(deposit) {
	return (
			<div className="deposit-details">
				<div>{deposit.deposit.description}</div>	
				<div>{formatMoney(deposit.deposit.amount)}</div>
				<div>{deposit.deposit.date}</div>
				<DeleteDeposit id={deposit.deposit.id} accountBalance={deposit.accountBalance} depositAmount={deposit.deposit.amount}>Delete</DeleteDeposit>
			</div>
	)
}