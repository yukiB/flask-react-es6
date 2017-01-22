import React from 'react'
import ReactDOM from 'react-dom'
import CommentBox from './components/CommentBox'


let RenderComponent = () =>
	ReactDOM.render(
    	    <CommentBox url="http://localhost:5000/data"/>,
	  document.getElementById('container')
	);


window.RenderComponent = RenderComponent;