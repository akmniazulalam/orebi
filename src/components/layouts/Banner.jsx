import { Link } from "react-router-dom"


const Banner = () => {
  return (
    <Link to={"/shop"}>
        <div className="bg-[url(/src/assets/bannerBg.png)] bg-no-repeat bg-cover bg-center h-[605px]"></div>
    </Link>
  )
}

export default Banner