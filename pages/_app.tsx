import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';

import { THEME_TYPES } from 'constant';
import { Themes } from 'constant/theme';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	const [currentTheme, setCurrentTheme] = useState<string>(THEME_TYPES.dark);

	useEffect(() => {
		setCurrentTheme(localStorage.getItem('theme') || THEME_TYPES.dark);
	}, []);

	return (
		<ThemeProvider theme={Themes[currentTheme]}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
