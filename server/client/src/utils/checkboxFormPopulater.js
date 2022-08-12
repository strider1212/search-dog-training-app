export const checkboxFormPopulater = (forAndId, UIText, setFunction, currentState, property) => {
  return (
    <div className="form-group">
        <label htmlFor={forAndId} className="form-check-label">{UIText}:</label>
        <input
        type="checkbox"
        className="form-check-input"
        id={forAndId}
        onChange={(e) => setFunction({
          ...currentState,
          [property]: e.target.checked
        })}
        />
      </div>
  )
}




// export const checkboxFormPopulater = (forAndId, UIText, setFunction) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={forAndId} className="form-check-label">{UIText}:</label>
//       <input 
//       type="checkbox" 
//       className="form-check-input" 
//       id={forAndId}
//       onChange={(e) => setFunction(e.target.checked)}
//       />
//     </div>
//   )
// }