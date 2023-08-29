export interface Transaction {
	status: string,
	sourceTime: string,
	nonce: string,
	senderAddress: string
	sourceTx: string,
	receiverAddress: string,
	destinationTx: string,
	sourceChain: string,
	destinationChain: string,
	tokenAddressSource: string,
	sourceTokenInfo: { icon: { url: string, alt: string }, name: string },
	destinationTokenInfo: { icon: { url: string, alt: string }, name: string },
	sourceAmount: string,
	destinationAmount: string,
	txSourceUrl: string,
	txDestinationUrl: string,
	senderExplorerUrl: string,
	receiverExplorerUrl: string,
	destinationTime: string
}
