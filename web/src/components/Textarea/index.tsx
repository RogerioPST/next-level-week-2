import React, { TextareaHTMLAttributes } from 'react'


import './styles.css'

//o extends permite obter as propriedades do HtmlElement
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
	name: string;
	label: string;
}

//o operador rest permite receber todas as propriedades de Textarea
const Textarea: React.FC<TextareaProps> = ({label, name, ...rest }) => {
	return (
		<div className="textarea-block">
			<label htmlFor={name}>{label}</label>
			<textarea id={name} {...rest}/>
		</div>
	)
}
export default Textarea