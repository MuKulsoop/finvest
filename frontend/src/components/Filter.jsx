import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight, X } from 'lucide-react';

const filterOptions = [
    "Art & Culture", "Community", "Economics & Infrastructure", "Education", "Environment & Energy",
    "Equality", "Finance", "Healthcare", "Nature", "NGO", "Charity", "Technology"
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
        <div className="p-4 pb-0 bg-white border rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center w-full  md:w-[70%] gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="flex-shrink-0 p-2 border rounded-full bg-green-500 hover:bg-green-400 text-white sm:text-base text-sm"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="relative flex flex-row gap-2 flex-grow overflow-x-auto scrollbar-hidden" ref={scrollContainerRef}>
                        {filteredOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => handleFilterToggle(option)}
                                className={`flex-shrink-0 px-3 min-w-[100px] py-1 border h-10 rounded-md text-sm whitespace-nowrap ${selectedFilters.includes(option) ? "bg-green-500 text-white" : "bg-gray-200"}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="flex-shrink-0 p-2 ml-2 border rounded-full bg-green-500 hover:bg-green-400 text-white sm:text-base text-sm"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-row w-full md:w-[350px] items-center justify-evenly lg:justify-end gap-2">
                    <div className="relative flex  md:w-auto">
                        <input
                            type="text"
                            placeholder="Search filters..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border rounded-md  text-sm"
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
                        className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 text-sm sm:text-base"
                    >
                        {isSheetOpen ? <ChevronUp /> : <ChevronDown />}
                        Filters
                    </button>
                </div>
            </div>

            <div className={`transition-transform duration-300 ease-in-out ${isSheetOpen ? "max-h-screen" : "max-h-0"} overflow-hidden mt-4`}>
                {selectedFilters.length > 0 && (
                    <div className="border-t pt-4 mt-4">
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
