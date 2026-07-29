import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <div>
      <Link to={props.url} className={props.buttonClassName}>{props.buttonText}</Link>
    </div>
  )
}

export default Button
