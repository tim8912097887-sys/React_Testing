import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeProvider from "../contexts/ThemeProvider";
import Navbar from "./Navbar";

const renderNavbar = () => {
    return render(
        <ThemeProvider>
          <Navbar/>
        </ThemeProvider>
    )
}

describe('Navbar',() => {

    let logo: HTMLHeadElement;
    let button: HTMLButtonElement;
    // Before each test start,select the element
    beforeEach(() => {
        renderNavbar();
        logo = screen.getByRole('heading');
        button = screen.getByRole('button',{ name: "toggle theme" });
    })

    it('The content and class name in initial rendering', async() => {
        // check the logo exist and have correct class name in light mode
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveClass("text-black");
        // Expect button have BsBrightnessHighFill icon in light mode
        expect(screen.getByTestId("dark-icon")).toBeInTheDocument();
    })

    it('Should change the class name when click the button', async() => {
         // After click the button,icon and class name will change
        const user = userEvent.setup();
        await user.click(button);
        expect(screen.getByTestId("light-icon")).toBeInTheDocument();
        expect(logo).toHaveClass("text-white");
    })
})