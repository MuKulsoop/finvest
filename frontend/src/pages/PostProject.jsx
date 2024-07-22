import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import { Link } from 'react-router-dom';
import { ChevronRight, Send,User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function PostProject() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amountNeeded: '',
        minDonation: '',
        category: '',
        milestones: ['', ''],
        image: '',
    });
    const [milestoneCount, setMilestoneCount] = useState(2);
    const [milestoneProgress, setMilestoneProgress] = useState([false, false]);

    const categories = [
        "Art & Culture", "Community", "Economics & Infrastructure", "Education",
        "Environment & Energy", "Equality", "Finance", "Healthcare",
        "Nature", "NGO", "Charity", "Technology"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMilestoneChange = (e, index) => {
        const updatedMilestones = [...formData.milestones];
        updatedMilestones[index] = e.target.value;
        setFormData({ ...formData, milestones: updatedMilestones });

        // Update progress indicator
        const progress = updatedMilestones.map((milestone) => milestone.length > 0);
        setMilestoneProgress(progress);
    };

    const handleMilestoneCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMilestoneCount(count);
        setFormData({ ...formData, milestones: Array(count).fill('') });
        setMilestoneProgress(Array(count).fill(false));
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
        <div className="flex min-h-screen w-full">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-4 md:px-3 z-[5]">
                            Post a New Project
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <Link to="/projects">
                            <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57] mr-4">
                                View Projects
                                <ChevronRight className="h-5 w-5" />
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
                            <div className="flex flex-col w-full md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="relative mb-6">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="h-80 w-full bg-gray-200 rounded-[30px] flex items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Project" className="object-cover h-full w-full" />
                                            ) : (
                                                <p className="text-gray-400 text-2xl font-semibold">Upload Image</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Project Name"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none text-xl"
                                        />
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Project Description"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                        />
                                        <Input
                                            type="number"
                                            name="amountNeeded"
                                            value={formData.amountNeeded}
                                            onChange={handleChange}
                                            placeholder="Amount Needed (In $)"
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                        />
                                        <Input
                                            type="number"
                                            name="minDonation"
                                            value={formData.minDonation}
                                            onChange={handleChange}
                                            placeholder="Minimum Amount (In $)"
                                            required
                                            className="w-full px-4 py-2 border-0 border-b border-gray-300 rounded-md focus:ring-0"
                                        />
                                        
                                        <Select
                                            value={formData.category}
                                            onValueChange={handleCategoryChange}
                                            placeholder="Select Category"
                                            className="w-full  focus:ring-0 text-gray-500 px-2 py-2"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>

                                <div className="flex-2 min-w-[35%] ">
                                    <div className="bg-gray-100 rounded-[30px] p-6 space-y-4">
                                        <label className="block text-gray-700">Number of Milestones</label>
                                        <Input
                                            type="number"
                                            name="milestoneCount"
                                            value={milestoneCount}
                                            onChange={handleMilestoneCountChange}
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                            min="0"
                                        />

                                        <div className="relative mt-6">
                                            <div className="absolute left-2 top-0 bottom-0 w-2 bg-gray-200 rounded-full transition-all duration-500 ease-in-out"></div>
                                            <div className="absolute left-2 top-0 bottom-0 w-2 bg-[#2FB574] rounded-full transition-all duration-1000 ease-in-out" style={{ height: `${milestoneProgress.filter(Boolean).length / milestoneCount * 100}%` }}></div>

                                            <div className="space-y-4 pl-[2px]">
                                                {formData.milestones.map((milestone, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className={`h-5 w-6 z-[5] rounded-full ${milestoneProgress[index] ? 'bg-[#26925e]' : 'bg-gray-300'}`} />
                                                        <Textarea
                                                            name={`milestone-${index}`}
                                                            value={milestone}
                                                            onChange={(e) => handleMilestoneChange(e, index)}
                                                            placeholder={`Milestone ${index + 1}`}
                                                            required
                                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full mt-5 bg-[#2FB574] text-white py-2 rounded-[30px] hover:bg-[#26925e]">
                                        Post Project
                                        <Send className="h-5 w-5 mx-3" />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default PostProject;
