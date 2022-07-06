import React, { useEffect, useState } from "react";
import AddIncomeForm from "./AddIncomeForm";
import Accounts from "./Accounts";

export default function App() {
	const [income, setIncome] = useState(0);
	const [source, setSource] = useState("");

	useEffect(() => {
    	setIncome(JSON.parse(window.localStorage.getItem('income')));
    	setSource(window.localStorage.getItem('source'));
  	}, []);



  	useEffect(() => {
    	window.localStorage.setItem('income', income);
    	window.localStorage.setItem('source', source);
  	}, [income, source]);


	const addIncome = income => {
		return (
			setIncome(income.amount),
			setSource(income.source)
		)
	};

	const updateIncome = depositAmount => {
		let newIncome = income;
		newIncome -= depositAmount;
		return setIncome(newIncome)
	};


		return (
			<div className="main">
				<div className="income">Income: ${income}</div>
				<div className="income">Source: {source}</div>
				<AddIncomeForm addIncome={addIncome} />
				<Accounts updateIncome={updateIncome} incomeAmount={income} incomeSource={source}/>
			</div>
		)
	
}