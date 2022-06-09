import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { withItemData, statelessSessions } from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Account } from "./schemas/Account";
import { Deposit } from "./schemas/Deposit";
import { Withdrawal } from "./schemas/Withdrawal";
import "dotenv/config"; //takes variables from .env and make them available inside keystone.ts


const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 30, // How long should they stay signed in?  60 sec * 60 min * 24 hours * 30 days
	secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	initFirstItem: {
		fields: ["name", "email", "password"],
		//TODO: add in initial roles here
	}
});

export default withAuth(config({
	server: {
		cors: {
			origin: [process.env.FRONTEND_URL],
			credentials: true,
		},
	},
	db: {
		adapter: "mongoose",
		url: databaseURL,
	},
	lists: createSchema({
		// Schema items go in here
		User,
		Account,
		Deposit,
		Withdrawal
	}),
	ui: {
		// Show the UI only for people who pass this test
		isAccessAllowed: ({ session }) => {
			//!! coerces it to be a boolean
			return !!session?.data
		},
	},
	session: withItemData(statelessSessions(sessionConfig), {
		// GraphQL Query
		User: `id`
	})
})
);