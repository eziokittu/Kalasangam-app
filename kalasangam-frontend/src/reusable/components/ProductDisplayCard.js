import React from 'react'

export default function ProductDisplayCard(props) {
  return (
    <article className="product">
			<img src={props.image} alt={props.title}/>
			<h2>{props.title}</h2>
			<p className="price">{props.price}</p>
			<p className="description">{props.description}</p>
			<button className="add-to-cart">Learn more</button>
		</article>
  )
}
