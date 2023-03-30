import React from 'react'
import './placeholder.css'

export default function Placeholder(props: any) {
  return (
    <div className='placeholder'>{props.text}</div>
  )
}
