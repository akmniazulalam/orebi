
const Container = ({children, className}) => {
  return (
    <div className={`max-w-355 m-auto px-4 xl:px-0 ${className || ""}`}>{children}</div>
  )
}

export default Container