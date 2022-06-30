import React from "react";

export default class AddIncomeForm extends React.Component {
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
		//reset the form
		event.currentTarget.reset();
	};
	render() {
		return (
			<form onSubmit={this.addIncome}>
				<input name="amount" ref={this.amountRef} type="text" placeholder="Amount" />
				<input name="source" ref={this.sourceRef} type="text" placeholder="Source" />
				<button type="submit">Submit</button>
			</form>
		);
	}
}