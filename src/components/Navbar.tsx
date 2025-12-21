import { BsBrightnessHighFill, BsBrightnessLow } from "react-icons/bs";
import { useTheme } from "../contexts/ThemeProvider"

const Navbar = () => {

    const { theme,setDarkMode,setLightMode } = useTheme();

  return (
    <nav className="w-full h-24">
      <div className="w-full h-full px-5 flex justify-between items-center">
         <h1 className={`${theme==="dark"?"text-white":"text-black"} font-bold text-3xl`}>Resturant</h1>
         <div>
            {theme==="dark"?<BsBrightnessLow className="text-3xl cursor-pointer text-amber-50" onClick={setLightMode} />:<BsBrightnessHighFill className="text-3xl cursor-pointer " onClick={setDarkMode} />}
         </div>
      </div>
    </nav>
  )
}

export default Navbar