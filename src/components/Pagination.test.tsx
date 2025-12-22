import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import userEvent from "@testing-library/user-event";


describe("Pagination",() => {

    // Set up current status base on current page and total page
    const setup = (currentPage = 1,totalPages = 10) => {
        // Mock the setCurrentPage function
        const setCurrentPageMock = vi.fn();
        // Render the component
        render(
           <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPageMock} />
        )
        return { setCurrentPageMock };
    }

    it('Should show up correct number of buttons based on the total page and page button limit', () => {
        setup(6,12);
        
        // If page button limit is two,it should show up two on both side of current button 
        // It always show up first and last button if button num is greater than two
        expect(screen.getByRole('button',{ name: "Go to page 1" }));
        expect(screen.getByRole('button',{ name: "Go to page 4" }));
        expect(screen.getByRole('button',{ name: "Go to page 12" }));
    })

    // Sliding window logic check
    it('Should show left ellipse but hide right ellipse when near the end', () => {
        setup(5,8);
        
        expect(screen.getByLabelText("left ellipse")).toBeInTheDocument();
        // Use queryBy or it would throw error if not found
        expect(screen.queryByLabelText("right ellipse")).not.toBeInTheDocument();

    })

    it('Should show right ellipse but hide left ellipse when near the start', () => {
        setup(4,8);
        // Use queryBy or it would throw error if not found    
        expect(screen.queryByLabelText("left ellipse")).not.toBeInTheDocument();
    
        expect(screen.getByLabelText("right ellipse")).toBeInTheDocument();

    })

    it('Should show both ellipses when in the middle of many pages', () => {
        setup(8,18);
          
        expect(screen.getByLabelText("left ellipse")).toBeInTheDocument();
    
        expect(screen.getByLabelText("right ellipse")).toBeInTheDocument();

    })

    it('Should not show both ellipses when in the middle of pages that did not supress the page button limit on both side', () => {
        setup(4,7);
          
        expect(screen.queryByLabelText("left ellipse")).not.toBeInTheDocument();
    
        expect(screen.queryByLabelText("right ellipse")).not.toBeInTheDocument();

    })

    it('Should have greater padding when button is current page', () => {
        setup(3,10);

        expect(screen.getByRole("button",{ name: "Go to page 3" })).toHaveClass("py-1 px-3");
    })

    // Boundary check
    it('Should prevent the page go below 1', async() => {
        const { setCurrentPageMock } = setup(1,7);
        const user = userEvent.setup();
        const preButton = screen.getByRole("button",{ name: "<" });
        await user.click(preButton);
        expect(setCurrentPageMock).not.toHaveBeenCalled();
    })

    it('Should prevent the page go above total pages', async() => {
        const { setCurrentPageMock } = setup(7,7);
        const user = userEvent.setup();
        const nextButton = screen.getByRole("button",{ name: ">" });
        await user.click(nextButton);
        expect(setCurrentPageMock).not.toHaveBeenCalled();
    })
})