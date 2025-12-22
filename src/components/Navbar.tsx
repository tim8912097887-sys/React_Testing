import { BsBrightnessHighFill, BsBrightnessLow } from "react-icons/bs";
import { useTheme } from "../contexts/ThemeProvider"

const Navbar = () => {

    const { theme,setDarkMode,setLightMode } = useTheme();

  return (
    <nav className="w-full h-24">
      <div className="w-full h-full px-5 flex justify-between items-center">
         <h1 className={`${theme==="dark"?"text-white":"text-black"} font-bold text-3xl`}>Resturant</h1>
         <div>
            {theme==="dark"?<button className="text-3xl cursor-pointer" aria-label="toggle theme" onClick={setLightMode}><BsBrightnessLow data-testid="light-icon" className="text-amber-50" /></button>:<button className="text-3xl cursor-pointer" aria-label="toggle theme" onClick={setDarkMode}><BsBrightnessHighFill data-testid="dark-icon" /></button>}
         </div>
      </div>
    </nav>
  )
}

export default Navbar