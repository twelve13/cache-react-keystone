import React from 'react';
import AddIncomeForm from "../components/AddIncomeForm";
import Accounts from "../components/Accounts";

export default class AccountsPage extends React.Component {
	state = {
		amount: 0,
		source: ""
	};
	addIncome = income => {
		//take a copy of the existing state
		const incomeState = {...this.state}
		//update the state
		incomeState.amount = income.amount;
		incomeState.source = income.source;
		//set the new object to state
		this.setState({
			amount: incomeState.amount,
			source: incomeState.source
		})
	};
	updateIncome = (depositAmount) => {
		const incomeState = {...this.state}
		incomeState.amount -= depositAmount;
		this.setState({
			amount: incomeState.amount
		})
	};

	render() {
		return (
			<div>
			
				<div className="income">Income: ${this.state.amount}</div>
				<div className="income">Source: {this.state.source}</div>
				<AddIncomeForm addIncome={this.addIncome} />
				<Accounts updateIncome={this.updateIncome} incomeSource={this.state.source}/>
			</div>
		);
	}
}