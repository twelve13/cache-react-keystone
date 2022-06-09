import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
	return (
		<header>
			<p>I am the header</p>
			<Link href="/">Cache</Link>
			<Nav />
		</header>
	);
}