import { View, Text } from 'react-native'
import React from 'react'
interface OptionCardProps {
	options: {
		id: number,
		title: string,
		desc: string,
		icon: string,
		people?: string
	}
	selectedOptions : {
		id: number,
		title: string,
		desc: string,
		icon: string,
		people?: string
	} | null
}
const OptionCard: React.FC<OptionCardProps> = ({ options, selectedOptions }) => {
	console.log();

	return (
		<>
			<View style={[{
				padding: 18,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				// backgroundColor: '#D3D3D3'
				backgroundColor: '#f2f2f2',
				borderRadius: 15
			}, selectedOptions?.id == options.id && { borderWidth: 3 }]}>

				<View>
					<Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold' }}>
						{options.title}
					</Text>
					<Text style={{
						fontSize: 16,
						fontFamily: 'Poppins-Light',
						color: 'black'
					}}>
						{options.desc}
					</Text>
				</View>
				<Text style={{ fontSize: 35 }}>
					{options.icon}
				</Text>
			</View>
		</>
	)
}

export default OptionCard