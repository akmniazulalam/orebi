
const Container = ({children, className}) => {
  return (
    <div className={`max-w-355 m-auto ${className}`}>{children}</div>
  )
}

export default Container