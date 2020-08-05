import React, { InputHTMLAttributes } from 'react'


import './styles.css'

//o extends permite obter as propriedades do HtmlElement
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
	name: string;
	label: string;
}

//o operador rest permite receber todas as propriedades de input
const Input: React.FC<InputProps> = ({label, name, ...rest }) => {
	return (
		<div className="input-block">
			<label htmlFor={name}>{label}</label>
			<input type="text" id={name} {...rest}/>
		</div>
	)
}
export default Input