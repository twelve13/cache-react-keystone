import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";

//https://keystonejs.com/docs/apis/fields
export const Deposit = list({
	//the Keystone ui interface
	ui: {
		listView: {
			initialColumns: ["description", "amount", "date"]
		}
	},
	fields: {
		description: text({ isRequired: true }),
		amount: integer({ isRequired: true }),
		date: text({ isRequired: true }),
		account: relationship({ ref: "Account.deposits", many: true })
	}
});