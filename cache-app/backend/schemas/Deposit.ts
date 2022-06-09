import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";

export const Deposit = list({
	fields: {
		amount: integer(),
		date: text({ isRequired: true }),
		account: relationship({ ref: "Account.deposit", many: true })
	}
});