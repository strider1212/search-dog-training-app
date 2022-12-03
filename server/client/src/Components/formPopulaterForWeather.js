export const formPopulater = (forAndId, UIText, type, placeholder, setFunction, currentState, property, errorFunction, errorCategory, defaultValue) => {
  return (
    <div>
      <p>{errorFunction[errorCategory]}</p>
      <div className="form-group">
        <label htmlFor={forAndId}>{UIText}:</label>
        <input
        type={type}
        className="form-control"
        id={forAndId}
        placeholder={placeholder}
        onInput={(e) => setFunction({
          ...currentState,
            [property]: e.target.value
        })}
        defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}