import { config, list } from "@keystone-next/keystone/schema";
import { text, integer, relationship } from "@keystone-next/fields";
import Deposit from "./Deposit";
import Withdrawal from "./Withdrawal";

export const Account = list({
	// TODO
	// access:
	fields: {
		name: text({ isRequired: true }),
		goal: integer(),
		balance: integer(),
		deposits: relationship({
			ref: "Deposit.account",
			many: true,
			ui: {
				inlineCreate: { fields: ["amount", "date"] }
			}
		}),
		withdrawals: relationship({
			ref: "Withdrawal.account",
			many: true,
			ui: {
				inlineCreate: { fields: ["name", "amount", "date"] }
			}
		})
	}
});