import {
	Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
	<Html>
		<Head>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
			<link rel="apple-touch-icon" href="/icons/positron.svg" />
			<link rel="manifest" href="/app.webmanifest" />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default Document;
