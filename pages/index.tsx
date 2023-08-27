import { TransactionHistory, TransactionDetail } from 'components';
import { useRouter } from 'next/router';

import { MainContainer } from 'styles/Home.style';

export default function Home() {
	const router = useRouter();
	return (
		<MainContainer>
			{ router.query.nonce && router.query.source
				? <TransactionDetail />
				: <TransactionHistory />}
		</MainContainer>
	);
}
