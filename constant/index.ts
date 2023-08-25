import { Icons } from './images';

// eslint-disable-next-line no-shadow
export const enum ChainId {
	'ETHEREUM' = 'ETHEREUM',
	'NEAR' = 'NEAR',
}

export const THEME_TYPES: {[key: string]: string} = {
	light: 'light',
	dark: 'dark',
};

export const StatusMap: {[key: string]: 'success' | 'warning' | 'error' } = {
	completed: 'success',
	pending: 'warning',
	failed: 'error',
};

export const CHAIN_EXPLORER_MAP: {
	[key: string]: string
} = {
	[ChainId.NEAR]: process.env.NEXT_PUBLIC_ENV === 'prod' ? 'https://explorer.near.org/transactions' : 'https://explorer.testnet.near.org/transactions',
	[ChainId.ETHEREUM]: process.env.NEXT_PUBLIC_ENV === 'prod' ? 'https://etherscan.io/tx' : 'https://goerli.etherscan.io/tx',
};

export const CHAIN_ICON_MAP: {
	[key: string]: { url: string, alt: string}
} = {
	[ChainId.ETHEREUM]: Icons.ETH,
	[ChainId.NEAR]: Icons.NEAR,
};

export const TOKEN_CONTRACTS_ICON_MAP = {
	[process.env.NEXT_PUBLIC_ENV === 'prod' ? '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' : '0xc5bbac81754d2ccfdde030f6aea05d881752f2f8']: { icon: Icons.USDC, name: 'USDC' },
	[process.env.NEXT_PUBLIC_ENV === 'prod' ? 'zk-usdc.zkrouter.near' : 'electron-zkusdc.admin_electronlabs.testnet']: { icon: Icons.zkUSDC, name: 'zkUSDC.e' },
	[process.env.NEXT_PUBLIC_ENV === 'prod' ? 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near' : 'electron-rusdc.admin_electronlabs.testnet']: { icon: Icons.rUSDC, name: 'USDC.e' },
};
