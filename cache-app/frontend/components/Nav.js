import Link from "next/link";

export default function Nav() {
	return (
		<nav>
			<Link href="/createAccount">Create Account</Link>
			<Link href="/summary">Summary</Link>
		</nav>
	)
}