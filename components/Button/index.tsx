import React from 'react';
import Image from 'next/image';
import { useTheme } from '@emotion/react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { StyledButton } from './style';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	const theme = useTheme();
	const {
		children, onClick, type, iconURL, altText, disable, style, ref, isLoading,
	} = props;
	const color = type ? theme.button[type] : theme.button.primary;
	return (
		<StyledButton
			ref={ref}
			onClick={onClick}
			icon={iconURL && <Image src={iconURL} alt={altText || ''} width={36} height={36} />}
			disabled={disable}
			style={{
				background: disable ? theme.button.secondary : color,
				color: disable ? theme.text.tertiary : '#fff',
				...style,
			}}
		>
			{
				isLoading
					? <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: '#fff' }} spin />} />
					: children
			}
		</StyledButton>
	);
};

export default Button;
