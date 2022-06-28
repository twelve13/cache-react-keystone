import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
	return (
		<header className="header">
			<Link href="/"><div className="logo">Cache</div></Link>
			<Nav />
		</header>
	);
}