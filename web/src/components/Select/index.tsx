import React, { SelectHTMLAttributes } from 'react'


import './styles.css'

//o extends permite obter as propriedades do HtmlElement
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
	name: string;
	label: string;
	options: Array<{
		value: string;
		label: string
	}>;
}

//o operador rest permite receber todas as propriedades de Select
const Select: React.FC<SelectProps> = ({label, name, options, ...rest }) => {
	return (
		<div className="select-block">
			<label htmlFor={name}>{label}</label>
			<select value="" id={name} {...rest}>
				<option value="" disabled hidden>Seleciona uma opção</option>
				{options.map(option =>{
					return <option key={option.value} value={option.value}>{option.label}</option>
				})}
			</select>
		</div>
	)
}
export default Select