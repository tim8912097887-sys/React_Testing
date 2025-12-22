import { render, screen } from "@testing-library/react";
import ThemeProvider from "../contexts/ThemeProvider";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";

// Simulate the prop pass to ProductCard
const mockObject = {
    id: 1,
    title: "Red Lipstick",
    description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    price: 12.99,
    images: ["https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp"]
}
// Wrap component inside the theme context
const renderProductCard = () => {
    return render(
        <ThemeProvider>
            <ProductCard product={mockObject} />
        </ThemeProvider>
    )
}
describe("ProductCard",() => {
    // Unit test for content and light mode
    describe("Initial Rendering",() => {

        let title: HTMLHeadingElement;
        let description: HTMLParagraphElement;
        let price: HTMLSpanElement;
        // Before each test start,select the element
        beforeEach(() => {
            renderProductCard();
            title = screen.getByRole('heading',{ name: /red lipstick/i });
            description = screen.getByText(/the red lipstick is a classic/i);
            price = screen.getByText(/12.99/i);
        })

        it('then display correct content in each element', () => {
        
            // Validate if it exist
            expect(title).toBeInTheDocument();
            expect(description).toBeInTheDocument();
            expect(price).toBeInTheDocument();
            // Check the correctness of text content
            expect(title.textContent).toBe("Red Lipstick");
            expect(description.textContent).toBe("The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.");
            expect(price.textContent).toBe("12.99");
        })
        
        it('then have correct classname in light mode', () => {

            // Check the class name
            expect(title).toHaveClass('text-black');
            expect(description).toHaveClass('text-black');
            expect(price).toHaveClass('text-black');
        })

    })
 
    // Integration with theme switch
    describe("Theme Integration",() => {

        it('Changes classnames when theme is toggled via Navbar', async() => {
            // Render navbar for integration test
            render(
                <ThemeProvider>
                    <Navbar/>
                    <ProductCard product={mockObject} />
                </ThemeProvider>
            )
            
            // Initial state
            const title = screen.getByRole('heading',{ name: /red lipstick/i });
            const description = screen.getByText(/the red lipstick is a classic/i);
            const price = screen.getByText(/12.99/i);
            
            // Simulate user click the button
            const user = userEvent.setup();
            const button = screen.getByRole('button',{ name: 'toggle theme' });
            await user.click(button);

            // Check the class name
            expect(title).toHaveClass('text-white');
            expect(description).toHaveClass('text-white');
            expect(price).toHaveClass('text-white');
        })
    })
})
