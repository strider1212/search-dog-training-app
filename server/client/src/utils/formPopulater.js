
export const formPopulater = (forAndId, UIText, type, placeholder, setFunction, currentState, property) => {
  // let valueHolder;

  // if (type === "number") {
  //   valueHolder = 'valueAsNumber'
  // } else {
  //   valueHolder = 'value'
  // }
  return (
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
        />
      </div>
  )
}