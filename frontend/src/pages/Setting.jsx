import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import FadeIn from '@/components/FadeIn';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusCircle, Share2, ArrowBigUpDash, ChevronRight, Send,User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Setting = () => {
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        contact: '',
        // minDonation: '',
        category: '',
        category1: '',
        image: '',
    });
    const categories = [
        "Indivisual", "Community", "Company"
    ];
    const categories1 = [
        "India", "United Sates", "United Kingdom", "Japan", "Denmark", "Finland", "Yemen", "Oman", "Qatar", "Zimbabwe", "Iran", "Russia", "Algeria", "Sweden", "Netherlands", "Australia", "France", "Poland", "New Zealand", "Germany", "Switzerland"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };
    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-auto scrollbar-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.1} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-2 pl-4 md:px-3 z-[5]">Settings</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        <Link to="/post-project">
                            <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57] mr-4">
                                <PlusCircle className="h-5 w-5" />
                                Post a Project
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2} >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <User className="h-8 w-8" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </FadeIn>
                </header>
                <FadeIn direction="up" delay={0.2} fullWidth>
                    <div className="p-10 flex flex-col w-full gap-10 items-center">
                        <form className="w-full space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full md:flex-row  justify-evenly">
                                <div className="flex-1 flex-col md:max-w-[30%] bg-background p-10 rounded-[30px] shadow-md hover:shadow-lg ">

                                    {/* <Button type="submit" className="w-full mt-5 bg-[#2FB574] text-white py-2 rounded-[30px] hover:bg-[#26925e]">
                                        Post Project
                                        <Send className="h-5 w-5 mx-3" />
                                    </Button> */}
                                </div>
                                <div className="flex-1 md:max-w-[60%]  p-10 rounded-[30px] shadow-md hover:shadow-lg">
                                    <div className="text-2xl md:text-4xl text-[#] font-bold pb-4 md:pb-8">Let's set your profile</div>
                                    <div className="relative mb-6 flex flex-row items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className=" h-24 w-24 md:h-48 md:w-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Project" className="object-cover h-full w-full" />
                                            ) : (
                                                <p className="text-gray-400 md:text-2xl text-md text-center font-semibold">Upload Image</p>
                                            )}
                                        </div>
                                        <div className="text-xl md:text-2xl text-[#] font-semibold px-5">Profile Photo</div>

                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            type="text"
                                            name="username"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Username"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none text-xl"
                                        />
                                        <Textarea
                                            name="bio"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Bio"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                        />
                                        <Input
                                            type="number"
                                            name="contact"
                                            value={formData.amountNeeded}
                                            onChange={handleChange}
                                            placeholder="Contact"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                        />
                                        {/* <Input
                                            type="number"
                                            name="minDonation"
                                            value={formData.minDonation}
                                            onChange={handleChange}
                                            placeholder="Minimum Amount (In $)"
                                            required
                                            className="w-full px-4 py-2 border-0 border-b border-gray-300 rounded-md focus:ring-0"
                                        /> */}

                                        <Select
                                            value={formData.category}
                                            onValueChange={handleCategoryChange}
                                            placeholder="Investor Type"
                                            className="w-full  focus:ring-0 text-gray-500 px-2 py-2"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                <SelectValue placeholder="Investor Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={formData.category1}
                                            onValueChange={handleCategoryChange}
                                            placeholder="Country"
                                            className="w-full border-0  focus:ring-0 text-gray-500 px-2 py-2"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories1.map((category1) => (
                                                    <SelectItem key={category1} value={category1}>
                                                        {category1}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>


                            </div>
                        </form>
                    </div>
                </FadeIn>
            </div>


        </div>
    )
}
