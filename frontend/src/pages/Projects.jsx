import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { PlusCircle, Share2, ArrowBigUpDash } from "lucide-react";
import Sidebar from '@/components/Sidebar';
import '../App.css';
import FadeIn from '@/components/FadeIn';
import Filter from '@/components/Filter';

const projectsData = [
    {
        id: 1,
        title: "Innovative Solar Panels",
        description: "A project to develop new efficient solar panels that can be easily integrated into existing infrastructure, providing a sustainable and cost-effective energy solution.",
        creator: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        amountRaised: "$10,000",
        contributors: 50,
        upvotes: 13,
    },
    {
        id: 2,
        title: "Clean Water Initiative",
        description: "Providing clean water to underdeveloped regions by setting up filtration systems and educating local communities about water conservation and hygiene.",
        creator: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        image: "https://images.unsplash.com/photo-1534081333815-ae5019106622?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        amountRaised: "$20,000",
        contributors: 75,
        upvotes: 56,
    },
    {
        id: 3,
        title: "AI-Powered Healthcare",
        description: "Using AI to revolutionize healthcare services by improving diagnosis accuracy, predicting disease outbreaks, and personalizing patient treatment plans.",
        creator: "Alice Johnson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        amountRaised: "$15,000",
        contributors: 40,
        upvotes: 23,
    },
    {
        id: 4,
        title: "Eco-Friendly Packaging",
        description: "Developing sustainable packaging solutions that reduce environmental impact, including biodegradable materials and reusable packaging designs.",
        creator: "Bob Brown",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        image: "https://plus.unsplash.com/premium_photo-1661666994446-6352c334bf80?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        amountRaised: "$5,000",
        contributors: 20,
        upvotes: 6,
    },
    {
        id: 5,
        title: "Renewable Energy Sources",
        description: "Exploring new renewable energy sources, including wind, solar, and hydroelectric power, to create a sustainable and reliable energy future.",
        creator: "Charlie Davis",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        image: "https://plus.unsplash.com/premium_photo-1679917152562-09bb29e555c1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        amountRaised: "$25,000",
        contributors: 100,
        upvotes: 68,
    },
    {
        id: 6,
        title: "Educational App for Kids",
        description: "Creating an engaging educational app for children that combines fun and learning with interactive games and activities.",
        creator: "Emily White",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        image: "https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        amountRaised: "$8,000",
        contributors: 35,
        upvotes: 16,
    },
];

function Projects() {
    const [projects, setProjects] = useState(projectsData);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [userUpvotes, setUserUpvotes] = useState({});

    const handleUpvote = (projectId) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) =>
                project.id === projectId
                    ? { ...project, upvotes: userUpvotes[projectId] ? project.upvotes - 1 : project.upvotes + 1 }
                    : project
            )
        );

        setUserUpvotes((prevUserUpvotes) => ({
            ...prevUserUpvotes,
            [projectId]: !prevUserUpvotes[projectId],
        }));
    };

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">
            {/* Main Content Area */}
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-auto scrollbar-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.1} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-2 pl-4 md:px-3 z-[5]">Projects</h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        <Link to="/post-project">
                            <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57]">
                                <PlusCircle className="h-5 w-5" />
                                Post a Project
                            </Button>
                        </Link>
                    </FadeIn>
                </header>

                <FadeIn direction="up" delay={0.2} fullWidth>
                    <Filter />
                </FadeIn>

                <FadeIn direction="up" delay={0.3} fullWidth className="overflow-hidden scrollbar-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-5 md:p-10 overflow-hidden scrollbar-hidden">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="relative h-[400px] w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors cursor-pointer">
                                    <Share2 className="h-4 w-4 text-gray-600" />
                                </div>
                                <div
                                    className={`absolute inset-0 rounded-xl p-4 bg-white transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? "translate-y-[15%]" : "translate-y-[30%]"}`}
                                >
                                    <div
                                        className="absolute top-2 right-4 flex items-center justify-center p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                        onClick={() => handleUpvote(project.id)}
                                    >
                                        <ArrowBigUpDash
                                            className={`h-6 w-6 ${userUpvotes[project.id] ? "text-green-500" : "text-gray-600"} transition-colors`}
                                        />
                                        {project.upvotes > 0 && (
                                            <span className="ml-1 text-xs font-semibold text-gray-700">{project.upvotes}</span>
                                        )}
                                    </div>
                                    <h2 className="xl:text-2xl text-xl font-bold sm:line-clamp-1">{project.title}</h2>
                                    <div className="flex items-center mt-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={project.avatar} alt={project.creator} />
                                            <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="ml-2 text-sm font-medium text-gray-600">{project.creator}</p>
                                    </div>
                                    <p className="mt-4 text-gray-600 sm:line-clamp-3 line-clamp-2">{project.description}</p>
                                    <div className="mt-4 flex justify-between">
                                        <p className="text-green-600 font-semibold text-xl flex flex-col">
                                            {project.amountRaised}
                                            <span className="bg-[#2FB574] text-white text-[12px] px-3 py-0 mt-2 rounded-full line-clamp-1">Total Amount Raised</span>
                                            </p>
                                        <p className="text-gray-600 font-medium text-sm">{project.contributors} contributors</p>
                                    </div>
                                    {hoveredProject === project.id && (
                                        <Button className="mt-4 w-full bg-[#2FB574] text-white py-2 rounded-md hover:bg-green-700">
                                            Donate / Invest
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default Projects;
