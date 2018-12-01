import React from "react"

const Form = props => (
    <form onSubmit = {props.onClick} >
        <input type="text" 
         name = "city"
            className = "user-enter"
            placeholder = "Enter city"
        />
        <button  type = "submit">Send</button>
    </form>
)
export default Form;