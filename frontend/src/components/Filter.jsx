import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

const filterOptions = [
    "Art & Culture", "Community", "Economics & Infrastructure", "Education", "Environment & Energy",
    "Equality", "Finance", "Healthcare", "Nature", "NGO", "Charity", "Technology","Agriculture"
];

function Filter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const scrollContainerRef = useRef(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterToggle = (filter) => {
        setSelectedFilters(prevFilters =>
            prevFilters.includes(filter)
                ? prevFilters.filter(item => item !== filter)
                : [...prevFilters, filter]
        );
    };

    const handleRemoveFilter = (filter) => {
        setSelectedFilters(prevFilters =>
            prevFilters.filter(item => item !== filter)
        );
    };

    const filteredOptions = filterOptions.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -350 : 350,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="p-4 pb-0 bg-white border rounded-lg shadow-lg  w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 flex flex-row items-center w-full md:w-[calc(100%-280px)]  gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="flex-shrink-0 p-2 border rounded-full bg-[#2FB574] hover:bg-[#26925e] text-white sm:text-base text-sm"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="relative flex flex-row gap-2 flex-grow overflow-x-auto scrollbar-hidden" ref={scrollContainerRef}>
                        {filteredOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => handleFilterToggle(option)}
                                className={`flex-shrink-0 px-3 min-w-[100px] py-1 border h-10 rounded-md text-sm whitespace-nowrap ${selectedFilters.includes(option) ? "bg-[#2FB574] text-white" : "bg-gray-200"}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="flex-shrink-0 p-2 ml-2 border rounded-full bg-[#2FB574] hover:bg-[#26925e] text-white sm:text-base text-sm"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-2 flex flex-row w-full  md:max-w-[300px] items-center justify-evenly lg:justify-end gap-2">
                    <div className="relative flex ">
                        <input
                            type="text"
                            placeholder="Search filters..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border rounded-md  text-sm md:w-[150px] w-[200px]"
                        />
                        <button
                            onClick={() => setSearchTerm('')} // Clear search input on click
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <Search className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsSheetOpen(!isSheetOpen)}
                        className="px-4 py-2 bg-[#2FB574] hover:bg-[#26925e] text-white rounded-md flex items-center gap-2 text-sm sm:text-base"
                    >
                        {isSheetOpen ? <ChevronUp /> : <ChevronDown />}
                        Filters
                    </button>
                </div>
            </div>

            <div className={`transition-transform pb-2 duration-300 ease-in-out ${isSheetOpen ? "max-h-screen " : "max-h-0 "} overflow-hidden mt-4`}>
                {selectedFilters.length > 0 && (
                    <div className="border-t mt-3 pt-2 ">
                        <h4 className="font-bold mb-2">Selected Filters:</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedFilters.map(filter => (
                                <div key={filter} className="flex items-center bg-gray-200 rounded-md px-3 py-1">
                                    <span className="text-sm">{filter}</span>
                                    <button
                                        onClick={() => handleRemoveFilter(filter)}
                                        className="ml-2 text-red-500 hover:text-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Filter;
