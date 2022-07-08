import React from "react";

export default class AddIncomeForm extends React.Component {
	state = {
		toggled: false
	}

	amountRef = React.createRef();
	sourceRef = React.createRef();

	addIncome = (event) => {
		event.preventDefault();
		const income = {
			amount: this.amountRef.current.value,
			source: this.sourceRef.current.value
		}
		//console.log(income);
		this.props.addIncome(income);
		this.toggleForm();
		//reset the form
		event.currentTarget.reset();
	};

	toggleForm = () => {
		let toggled = this.state.toggled;
		this.setState({
			toggled: !toggled
		})
	}

	render() {
		return (
			<div className="add-income-form">
			<div className="add-income" onClick={this.toggleForm}><div className="add-income-button">+ Add Income</div></div>
			<form onSubmit={this.addIncome} className={this.state.toggled ? "show-form" : "hide-form"}>
				<input name="amount" ref={this.amountRef} type="text" placeholder="Amount" required/>
				<input name="source" ref={this.sourceRef} type="text" placeholder="Source" required/>
				<button type="submit">Submit</button>
			</form>
			</div>
		);
	}
}