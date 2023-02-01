import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { qrCodeOperations } from './QrCodeDescription';
import * as QRCode from 'qrcode';

const b64toBuffer = (dataURI: string) => {
	const base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
	const base64 = dataURI.substring(base64Index);
	const raw = Buffer.from(base64, 'base64');

	return raw;
};

export class QrCode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'QrCode',
		name: 'qrCode',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
		icon: 'file:logo.png',
		group: ['transform'],
		version: 1,
		subtitle: '',
		description: 'Create a QR Code image',
		defaults: {
			name: 'QrCode',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [...qrCodeOperations],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const value = this.getNodeParameter('value', 0) as string;
		const width = this.getNodeParameter('width', 0) as number;
		const config = this.getNodeParameter('qrCodeOptions', 0) as {
			qrcodeErrorCorrectionLevel?: {
				errorCorrectionLevel: QRCode.QRCodeErrorCorrectionLevel;
			};
			qrcodeSymbolVersion?: {
				symbolVersion: QRCode.QRCodeMaskPattern;
			};
			qrcodeColors?: {
				darkColor: string;
				lightColor: string;
			};
			darkColor?: string;
			lightColor?: string;
			qrcodeScale?: {
				scale: number;
			};
			'Attachment name'?: {
				attachmentName: string;
			};
		};

		const options: QRCode.QRCodeToDataURLOptions = {
			errorCorrectionLevel: config.qrcodeErrorCorrectionLevel?.errorCorrectionLevel,
			maskPattern: config.qrcodeSymbolVersion?.symbolVersion,
			width,
			color: {
				dark: config.qrcodeColors?.darkColor,
				light: config.qrcodeColors?.lightColor,
			},
			scale: config.qrcodeScale?.scale,
		};

		const data = await QRCode.toDataURL(value, options);
		const fileData = b64toBuffer(data);

		const returnData: INodeExecutionData[] = [
			{
				json: {
					data,
				},
				binary: {
					[config['Attachment name']?.attachmentName || 'qrcode']:
						await this.helpers.prepareBinaryData(fileData),
				},
			},
		];

		return this.prepareOutputData(returnData);
	}
}
