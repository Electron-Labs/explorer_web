import React from 'react';
import Image from 'next/image';

import { Images, Icons } from 'constant/images';
import { THEME_TYPES } from 'constant';
import Typography from 'components/Typography';
import { useTheme } from '@emotion/react';
import {
	Container,
	SettingWrapper,
	ButtonWrapper,
} from './style';
import { HeaderProps } from './type';

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
	const theme = useTheme();
	const { toggleTheme, currentTheme } = props;

	const handleTheme = () => {
		toggleTheme();
	};

	return (
		<Container>
			<Image
				src={currentTheme === THEME_TYPES.dark
					? Images.ELECTRON_LIGHT.url
					: Images.ELECTRON_DARK.url}
				alt={currentTheme === THEME_TYPES.dark
					? Images.ELECTRON_LIGHT.alt
					: Images.ELECTRON_DARK.alt}
				width={210}
				height={70}
				priority
			/>
			<ButtonWrapper>
				<a
					href="https://electron.freshdesk.com/"
					target="_blank"
					rel="noreferrer"
				>
					<Typography
						type="l4"
						shade="medium"
						style={{ color: theme.text.secondary, cursor: 'pointer' }}
					>
						Support
					</Typography>
				</a>
				<SettingWrapper>
					<Image
						height={24}
						width={24}
						src={currentTheme === THEME_TYPES.dark ? Icons.SUN.url : Icons.MOON.url}
						alt={currentTheme === THEME_TYPES.dark ? Icons.SUN.alt : Icons.MOON.alt}
						onClick={handleTheme}
						style={{ cursor: 'pointer' }}
					/>
				</SettingWrapper>
			</ButtonWrapper>
		</Container>
	);
};

export default Header;
