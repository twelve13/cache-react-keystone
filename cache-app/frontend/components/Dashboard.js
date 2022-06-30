import React from 'react';
import AddIncomeForm from "./AddIncomeForm";

export default class Dashboard extends React.Component {
	state = {
		amount: 0,
		source: ""
	};
	addIncome = income => {
		//take a copy of the existing state
		const incomeState = {...this.state.income}
		//update the state
		incomeState.amount = income.amount;
		incomeState.source = income.source;
		//set the new object to state
		this.setState({
			amount: incomeState.amount,
			source: incomeState.source
		})
	};
	render() {
		return (
			<div>
				<Header />
				<div>{this.state.amount}</div>
				<AddIncomeForm addIncome={this.addIncome} />
				{this.props.children}
			</div>
		);
	}
}