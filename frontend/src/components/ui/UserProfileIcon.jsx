import React from "react";
import {  User, Settings, LifeBuoy, LogOut } from "lucide-react";
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
                <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-10 w-10">
                    <User className="h-7 w-7" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                {/* {username} */}
                Username
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link to="/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <a href="#support-section" className='relative flex w-full gap-2' onClick={handleSupportClick}>
                        <LifeBuoy className="h-4 w-4" />
                        Support
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileIcon;
