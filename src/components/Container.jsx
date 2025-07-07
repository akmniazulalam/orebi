
const Container = ({children, className}) => {
  return (
    <div className={`max-w-[1300px] m-auto ${className}`}>{children}</div>
  )
}

export default Container