import '@emotion/react';

declare module '*.svg';

declare module '@emotion/react' {
  export interface Theme {
    background: {
      base: string
      card: string
      container: string,
			shadow: string,
    },
		text: {
			primary: string
			secondary: string
			tertiary: string
			active: string
		},
		button: {
			primary: string,
			secondary: string,
			error: string,
			text: string,
		},
		border: string,
		error: string,
		divider: string,
  }
}

export interface ChainType {
	id: string,
	label: string,
	icon: {
		url: string,
		alt: string,
	},
	wallet: string,
}

export interface TokenType {
	id: string,
	label: string,
	icon: {
		url: string,
		alt: string,
	}
}
