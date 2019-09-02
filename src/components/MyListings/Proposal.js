import React from 'react';
 
export default function MyInput (props) {
  let cut = props.price * .15;
  return (
    <div>
      <h1>Price Proposal</h1>
      <br/>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <p>Your listed price:</p>
        <p>${props.price}</p>
      </div>
      <br/>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <p>15% cut:</p>
        <p>${cut}</p>
      </div>
      <hr/>
      <br/>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <p>Amount you will receive</p>
        <p>${props.price - cut}</p>
      </div>
    </div>
  )
}