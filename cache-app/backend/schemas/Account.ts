import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";

export const Account = list({
	// TODO
	// access:
	fields: {
		name: text({ isRequired: true }),
		goal: integer(),
		currentAmount: integer(),
		deposit: relationship({
			ref: "Deposit.account",
			many: true,
			ui: {
				inlineCreate: { fields: ["amount", "date"] }
			}
		}),
		withdrawal: relationship({
			ref: "Withdrawal.account",
			many: true,
			ui: {
				inlineCreate: { fields: ["name", "amount", "date"] }
			}
		})
	}
});