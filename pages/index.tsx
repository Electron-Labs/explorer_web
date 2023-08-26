import { TransactionHistory, TransactionDetail } from 'components';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	return (
		<main>
			{ router.query.nonce && router.query.source
				? <TransactionDetail />
				: <TransactionHistory />}
		</main>
	);
}
