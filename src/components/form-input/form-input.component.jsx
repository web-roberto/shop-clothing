import './form-input-styles.scss'
// a generic Input to use the same style in all of them
const FormInput = ({label,...otherProps}) => {
  return (
    <div className="group">
         <input className="form-input" {...otherProps}/>
        {label &&(
          <label className={`${otherProps.value.length?'shrink':''} form-input-label`}>{label}</label>
        )}
    </div>
  )
}

export default FormInput

