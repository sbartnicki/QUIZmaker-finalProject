import "./styles.scss";

export function Input({label, type, placeholder, value, handleOnChange}) {

  return(
    <div className="input-wrapper">
        <label htmlFor={label}>{label}</label>
          <input 
            id={label}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
          />
      </div>
  )
}