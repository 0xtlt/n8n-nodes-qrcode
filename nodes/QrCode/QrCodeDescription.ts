import { INodeProperties } from 'n8n-workflow';

export const qrCodeOperations: INodeProperties[] = [
	{
		displayName: 'Value',
		name: 'value',
		type: 'string',
		default: '',
		description: 'The value to encode',
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		default: 256,
		description: 'The width of the image',
	},
	{
		displayName: 'Options',
		name: 'qrCodeOptions',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: false,
		},
		options: [
			{
				name: 'qrcodeSymbolVersion',
				displayName: 'QR Code Symbol Version (1 - 40)',
				values: [
					{
						displayName: 'Symbol Version',
						name: 'symbolVersion',
						type: 'number',
						typeOptions: {
							maxValue: 10,
							minValue: 0,
							numberStepSize: 1,
						},
						default: 0,
					},
				],
			},
			{
				name: 'qrcodeScale',
				displayName: 'Scale Factor. A Value of `1` Means 1px per Modules (Black Dots)',
				values: [
					{
						displayName: 'Scale',
						name: 'scale',
						type: 'number',
						typeOptions: {
							minValue: 1,
							numberStepSize: 1,
						},
						default: 1,
					},
				],
			},
			{
				name: 'qrcodeErrorCorrectionLevel',
				displayName: 'QR Code Error Correction Level',
				values: [
					{
						displayName: 'Error Correction Level',
						name: 'errorCorrectionLevel',
						type: 'options',
						options: [
							{
								name: 'L',
								value: 'L',
							},
							{
								name: 'M',
								value: 'M',
							},
							{
								name: 'Q',
								value: 'Q',
							},
							{
								name: 'H',
								value: 'H',
							},
						],
						default: 'L',
					},
				],
			},
			{
				name: 'qrcodeMaskPattern',
				displayName: 'Mask Pattern (0 - 7)',
				values: [
					{
						displayName: 'Mask Pattern',
						name: 'maskPattern',
						type: 'number',

						typeOptions: {
							maxValue: 7,
							minValue: 0,
							numberStepSize: 1,
						},
						default: 0,
					},
				],
			},
			{
				name: 'qrcodeColors',
				displayName: 'QR Code Colors',
				values: [
					{
						displayName: 'Dark Color',
						name: 'darkColor',
						type: 'color',
						default: '#000000',
					},
					{
						displayName: 'Light Color',
						name: 'lightColor',
						type: 'color',
						default: '#ffffff',
					},
				],
			},
			{
				name: 'Attachment name',
				displayName: 'Attachment Name',
				values: [
					{
						displayName: 'Attachment Name',
						name: 'attachmentName',
						type: 'string',
						default: 'qrcode',
					},
				],
			},
		],
		default: [], // Initially selected options
		description: 'The events to be monitored',
	},
];
