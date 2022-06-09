import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";

export const Withdrawal = list({
	fields: {
		name: text({ isRequired: true }),
		amount: integer(),
		date: text({ isRequired: true }),
		account: relationship({ ref: "Account.withdrawal", many: true })
	}
});