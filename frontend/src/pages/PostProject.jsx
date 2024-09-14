import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Send } from 'lucide-react';
import UserProfileIcon from '@/components/ui/UserProfileIcon';

function PostProject() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amountNeeded: '',
        minDonation: '',
        category: '',
        milestones: [{ title: '', description: '', completionDate: '', amountRequired: '' }, { title: '', description: '', completionDate: '', amountRequired: '' }],
        image: null,
    });
    const [milestoneCount, setMilestoneCount] = useState(2);

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
        const { name, value } = e.target;
        const updatedMilestones = [...formData.milestones];
        updatedMilestones[index][name] = value;
        setFormData({ ...formData, milestones: updatedMilestones });
    };

    const handleMilestoneCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMilestoneCount(count);
        const updatedMilestones = Array(count).fill(null).map(() => ({
            title: '',
            description: '',
            completionDate: '',
            amountRequired: ''
        }));
        setFormData({ ...formData, milestones: updatedMilestones });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleCategoryChange = (value) => {
        setFormData({ ...formData, category: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('creator', 'John Doe'); // Static value, replace with dynamic data
        data.append('avatar', 'https://randomuser.me/api/portraits/men/1.jpg'); // Static value, replace with dynamic data
        data.append('image', formData.image);
        data.append('amountRaised', '$0'); // Static value, replace with dynamic data if needed
        data.append('contributors', 0); // Static value, replace with dynamic data if needed
        data.append('upvotes', 0); // Static value, replace with dynamic data if needed
        data.append('minimumDonation', formData.minDonation);
        data.append('milestones', JSON.stringify(formData.milestones));

        try {
            const response = await fetch('https://finvest-backend.onrender.com/project/create', {
                method: 'POST',
                body: data,
                headers: {
                    // No additional headers required for FormData
                }
            });

            const result = await response.json();
            console.log('Project created successfully:', result);
            navigate('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const milestoneProgress = formData.milestones.filter(milestone =>
        milestone.title && milestone.description && milestone.completionDate && milestone.amountRequired
    ).length;

    const totalMilestones = milestoneCount;
    const progressPercentage = totalMilestones > 0 ? (milestoneProgress / totalMilestones) * 100 : 0;

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-400">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-4 md:px-3 z-[5] line-clamp-1">
                            New Project
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <Link to="/projects">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                                View Projects
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon />
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
                                        <div className="h-80 w-full bg-[#1A3A2C] rounded-[30px] flex items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={URL.createObjectURL(formData.image)} alt="Project" className="object-cover h-full w-full" />
                                            ) : (
                                                <p className="text-gray-100 text-2xl font-semibold">Upload Image</p>
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
                                            className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 focus:outline-none text-xl text-white placeholder:text-gray-100 "
                                        />
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Project Description"
                                            required
                                            className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                                        />
                                        <Input
                                            type="number"
                                            name="amountNeeded"
                                            value={formData.amountNeeded}
                                            onChange={handleChange}
                                            placeholder="Amount Needed (In $)"
                                            required
                                            className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                                        />
                                        <Input
                                            type="number"
                                            name="minDonation"
                                            value={formData.minDonation}
                                            onChange={handleChange}
                                            placeholder="Minimum Amount (In $)"
                                            required
                                            className="w-full px-4 py-2 border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                                        />

                                        <Select
                                            value={formData.category}
                                            onValueChange={handleCategoryChange}
                                            placeholder="Select Category"
                                            className="w-full focus:ring-0 text-white px-2 py-2 bg-[#1A3A2C] placeholder:text-gray-100"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-500 focus:ring-0 text-white px-2 py-2">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#2C5440]">
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="flex-2 min-w-[35%]">
                                    <div className="bg-[#1A3A2C] rounded-[30px] p-6 space-y-4 relative">
                                        <label className="block text-gray-400">Number of Milestones</label>
                                        <Input
                                            type="number"
                                            name="milestoneCount"
                                            value={milestoneCount}
                                            onChange={handleMilestoneCountChange}
                                            className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                            min="2"
                                        />
                                        <div className="relative mt-6">
                                            <div className="absolute left-2 top-0 bottom-0 w-2 bg-[#2C5440] rounded-full"></div>
                                            <div
                                                className="absolute left-2 top-0 bottom-0 w-2 bg-[#2FB574] rounded-full"
                                                style={{ height: `${progressPercentage}%` }}
                                            ></div>
                                            {Array.from({ length: milestoneCount }).map((_, index) => (
                                                <div key={index} className="flex flex-col space-y-2">
                                                    <div className="flex flex-row items-center gap-4 space-x-1">
                                                        <div className={`ml-[1px] h-5 w-6 z-[5] rounded-full ${formData.milestones[index]?.title ? 'bg-[#26925e]' : 'bg-gray-300'}`} />
                                                        <div className="flex flex-col w-full space-y-2 mb-4">
                                                            <Input
                                                                type="text"
                                                                name="title"
                                                                value={formData.milestones[index]?.title || ''}
                                                                onChange={(e) => handleMilestoneChange(e, index)}
                                                                placeholder={`Milestone ${index + 1} Title`}
                                                                className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                                                required
                                                            />
                                                            <Textarea
                                                                name="description"
                                                                value={formData.milestones[index]?.description || ''}
                                                                onChange={(e) => handleMilestoneChange(e, index)}
                                                                placeholder={`Milestone ${index + 1} Description`}
                                                                className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                                                required
                                                            />
                                                            <Input
                                                                type="date"
                                                                name="completionDate"
                                                                value={formData.milestones[index]?.completionDate || ''}
                                                                onChange={(e) => handleMilestoneChange(e, index)}
                                                                className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                                                required
                                                            />
                                                            <Input
                                                                type="number"
                                                                name="amountRequired"
                                                                value={formData.milestones[index]?.amountRequired || ''}
                                                                onChange={(e) => handleMilestoneChange(e, index)}
                                                                placeholder="Amount Required (In $)"
                                                                className="w-full border-0 border-b border-gray-500 bg-[#1A3A2C] focus:ring-0 text-white placeholder:text-gray-100"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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
