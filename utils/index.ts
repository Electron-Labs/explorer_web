export const formatTransactionHash = (txHash: string = '') => {
	if (txHash) {
		return `${txHash.substring(0, 6)}...${txHash.substring(txHash.length - 4, txHash.length)}`;
	}
	return '';
};

export const isHexString = (input: string) => input?.match(/^[0x]+[A-Fa-f0-9]+$/);
