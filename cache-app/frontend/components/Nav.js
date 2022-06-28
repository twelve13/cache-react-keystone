import Link from "next/link";

export default function Nav() {
	return (
		<nav className="nav">
			<Link href="/createAccount">Create Account</Link>
			<Link href="/summary">Summary</Link>
		</nav>
	)
}