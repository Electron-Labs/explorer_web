import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';

import { Header } from 'components';
import { THEME_TYPES } from 'constant';
import { Themes } from 'constant/theme';
import { Wrapper, BackgroundContainer } from 'styles/Home.style';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const [currentTheme, setCurrentTheme] = useState<string>(THEME_TYPES.dark);

	useEffect(() => {
		setCurrentTheme(localStorage.getItem('theme') || THEME_TYPES.dark);
	}, []);

	const handleToggleTheme = () => {
		const theme = currentTheme === THEME_TYPES.light ? THEME_TYPES.dark : THEME_TYPES.light;
		setCurrentTheme(theme);
		localStorage.setItem('theme', theme);
	};

	return (
		<>
			<Head>
				<title>Electron Explorer</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icons/electron.svg" />
			</Head>
			<ThemeProvider theme={Themes[currentTheme]}>
				<Wrapper>
					<Header toggleTheme={handleToggleTheme} currentTheme={currentTheme} />
					<BackgroundContainer>
						<Component {...pageProps} />
					</BackgroundContainer>
				</Wrapper>
			</ThemeProvider>
		</>
	);
}
