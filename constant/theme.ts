import { THEME_TYPES } from './index';

export const TypographyColor = {
	regular: '#FFFFFF',
	disabled: '#C3CCD6',
	success: '#20A17F',
	message: '#7E8CF7',
	neutral: '#6A7682',
	default: '#C3CCD6',
	error: '#CC385A',
};

export const ButtonColor = {
	primary: '#644BC8',
	secondary: '#2B79CC',
};

export const ColorThemes = {
	primary: '#2B79CC',
	secondary: '#644BC8',
	disabled: '#C3CCD6',
	error: '#CC385A',
	success: '#20A17F',
	neutral: '#6A7682',
	message: '#7E8CF7',
};

export const Themes = {
	[THEME_TYPES.light]: {
		text: {
			primary: '#000000',
			secondary: '#637592',
			tertiary: '#000000',
			active: '#3D6EFF',
		},
		button: {
			primary: '#3D6EFF',
			secondary: '#B6BFCD',
			error: '#CC385A',
			text: '#FFFFFF',
		},
		background: {
			base: '#EEEEEE',
			card: '#FFFFFF',
			container: '#EEEEEE',
			shadow: '#C7DDFF',
		},
		border: '#000000b0',
		error: '#E03232',
		divider: '#DBDFE6',
	},
	[THEME_TYPES.dark]: {
		text: {
			primary: '#FFFFFF',
			secondary: '#7D8DA7',
			tertiary: '#C2CAD6',
			active: '#3D6EFF',
		},
		button: {
			primary: '#3D6EFF',
			secondary: '#191D24',
			error: '#CC385A',
			text: '#FFFFFF',
		},
		background: {
			base: '#111318',
			card: '#1F232D',
			container: '#111318',
			shadow: '#0D1734',
		},
		border: '#ffffff99',
		error: '#E03232',
		divider: '#242932',
	},
};
