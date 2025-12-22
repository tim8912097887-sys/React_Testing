import { act, render, screen } from "@testing-library/react";
import ThemeProvider from "./contexts/ThemeProvider";
import App from "./App";

// Simulate the product 
const mockObject = {
    products: [{ id: 1,title: "Test Product",description: "Description",price: 12.99,images: ["Image"] }],
    total: 10,
    skip: 0
};

const renderApp = () => {
    return render(
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    )
}
// Mock the actual api request
globalThis.fetch = vi.fn();

describe("App Component",() => {
      
    it('Should show loading state initially', () => {
        
        (fetch as any).mockResolvedValue({
            // Never resolve keep pending
            json: () => new Promise(() => {})
        })

        renderApp();
        expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    })

    it('Should render products after successful fetch', async() => {
        (fetch as any).mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockObject)
        })

        renderApp();
        // Wait the product resolve
        const title = await screen.findByRole("heading",{ name: "Test Product" });
        expect(title).toBeInTheDocument();
        expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    })

    it('Should show error element when failed to request', async() => {
         // Wait for the error throw and render
         await act(async() => {
            (fetch as any).mockRejectedValue(new Error("Fail to fetch"));
            renderApp();
         })
         
         expect(screen.getByLabelText(/error occur/i)).toBeInTheDocument();
    })
})