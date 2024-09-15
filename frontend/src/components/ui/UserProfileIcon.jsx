import React from "react";
import { User, Settings, LifeBuoy, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserProfileIcon = ({ username }) => {
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            // Call the logout API endpoint
            const response = await fetch('http://localhost:8000/logout', {
                method: 'POST',
                credentials: 'include', // Ensure cookies are sent
            });
    
            // Check response status
            if (!response.ok) {
                throw new Error('Logout failed');
            }
    
            // Clear local storage
            localStorage.removeItem('user');
    
            // Optionally, redirect the user or update the UI
            window.location.href = '/'; // Redirect to login page or home page
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    const scrollToSection = (section) => {
        const isSectionFilled = validateSection(section);
        if (isSectionFilled) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const validateSection = (section) => {
        switch (section) {
            case 'profile':
                return formData.username && formData.bio && formData.contact && formData.category1;
            case 'account':
                return true;
            case 'support':
                return true;
            case 'appearance':
                return true;
            case 'notification':
                return true;
            default:
                return false;
        }
    };

    const handleSupportClick = () => {
        navigate("/settings", { state: { scrollTo: "support" } });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-10 w-10 bg-[#10251C] text-white hover:bg-[#2FB574] transition-colors">
                    <User className="h-7 w-7" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#10251C] border border-gray-700 text-white rounded-md shadow-lg">
                <DropdownMenuLabel className="text-gray-400">
                    {/* {username} */}
                    Username
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-600" />
                <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center gap-2 text-white hover:text-[#2FB574]">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href="#support-section" className='relative flex w-full gap-2 text-white hover:text-[#2FB574]' onClick={handleSupportClick}>
                        <LifeBuoy className="h-4 w-4" />
                        Support
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-600" />
                <DropdownMenuItem className="flex items-center gap-2 text-white hover:text-red-500" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileIcon;
