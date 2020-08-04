import React from 'react'

import './styles.css'
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem() {
	return (
		<article className="teacher-item">
					<header>
						<img src="" alt=""/>
						<div>
							<strong>Rogerio							</strong>
							<span>Quimica</span>
						</div>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non autem repellat voluptate rerum aspernatur quis omnis repudiandae delectus possimus at necessitatibus praesentium et odio quaerat commodi ipsum, consectetur laborum labore?</p>
						<footer>
							<p>
								Preço/hora: <strong>R$80, 00</strong>
							</p>
							<button type="button">
								<img src={whatsAppIcon} alt="whatsapp"/>
								Entrar em contato
							</button>
						</footer>
					</header>
				</article>
	)
}
export default TeacherItem