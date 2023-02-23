import { useState } from "react";

export function Input({label, type, placeholder}) {
  const [input, setInput] = useState("");

  return(
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
          <input 
            id={label}
            type={type}
            placeholder={placeholder}
            value={input}
            onChange={(e) => {setInput(e.target.value)}}
          />
      </div>
  )
}