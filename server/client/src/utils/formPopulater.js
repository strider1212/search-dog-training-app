export const formPopulater = (forAndId, UIText, type, className, placeholder, setFunction) => {

  return (
    <div className="form-group">
      <label htmlFor={forAndId}>{UIText}:</label>
      <input 
      type={type} 
      className={className} 
      id={forAndId} 
      placeholder={placeholder}
      onInput={(e) => setFunction(e.target.value)}
      />
    </div>
  )
}