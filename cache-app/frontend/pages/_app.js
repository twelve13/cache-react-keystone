//anything higher than the Page component will go in app.js
import Page from "../components/Page";
import NProgress from "nprogress";
import Router from "next/router";
import "../components/styles/main.css";
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

//where is apollo prop coming from? when we export our app we'll wrap it in the withData function, will give app component with our data
function MyApp({ Component, pageProps, apollo }) {
	return (
		<ApolloProvider client={apollo}>
			<Page>
				<Component {...pageProps} />
			</Page>
		</ApolloProvider>
	);
}

//next.js thing
//if any of the pages have a getInitialProps method on them (which withData should add) then we're going to wait and fetch it
MyApp.getInitialProps = async function({ Component, ctx }) {
	let pageProps = {};
	if(Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
}

export default withData(MyApp);