//this is a custom hook
import { useState, useEffect } from "react";
//initial state is empty object
export default function useForm(initial = {}) {
	//create a state object for our inputs
	const  [inputs, setInputs] = useState(initial);
	const initialValues = Object.values(initial).join("");

	useEffect(() => {
		//this function runs when the things we are watching change, which is initialValues
		setInputs(initial);
	}, [initialValues]);

	function handleChange(e) {
		//destructure so you don't have to do e.target.name, e.target.value
		let { value, name, type} = e.target;
		//html inputs are automatically strings so need to convert to number
		if(type === "number") {
			value = parseInt(value)
		}
		setInputs({
			//copy the existing state
			...inputs,
			//name: e.target.value
			//[e.target.name]: e.target.value
			[name]: value
		})
	}

	function clearForm() {
		//turn the object into an array, map over it, set each value to emtpy, turn back into object
		//item[0] gives the keys, item[1] gives the values
		const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, ""]));
		setInputs(blankState);
	}

	//return the things we want to surface from this custom hook
	return {
		inputs,
		handleChange,
		clearForm
	};
}