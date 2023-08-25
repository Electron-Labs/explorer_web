import { TransactionReceipt } from '@ethersproject/providers';

export interface Transaction extends TransactionReceipt {
	status: string,
	sourceTime: string,
	nonce: string,
	senderAddress: string
	sourceTx: string,
	receiverAddress: string,
	destinationTx: string,
	amount: string,
	sourceChain: string,
	destinationChain: string,
	tokenAddressSource: string,
	tokenIcon: { url: string, alt: string}
	tokenName: string,
}
