import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import Sidebar from '@/components/Sidebar';
import '../App.css';
import FadeIn from '@/components/FadeIn';
import Filter from '@/components/Filter';
import { motion } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Innovative Solar Panels",
        description: "A project to develop new efficient solar panels that can be easily integrated into existing infrastructure, providing a sustainable and cost-effective energy solution.",
        creator: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        amountRaised: "$10,000",
        contributors: 50,
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
    },
];

function Projects() {
    const [hoveredProject, setHoveredProject] = useState(null);

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">


            {/* Main Content Area */}
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-auto scrollbar-hidden">

                <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    {/* Sidebar */}
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth  >
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-2 pl-4  md:px-3 z-[5]">Projects</h1>

                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}  >
                        <Link to="/post-project">
                            <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57]">
                                <PlusCircle className="h-5 w-5" />
                                Post a Project
                            </Button>
                        </Link>
                    </FadeIn>

                </header>
                
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="block" >
                    <Filter />
                </motion.span>


                <FadeIn direction="up" delay={0.2} fullWidth className="overflow-hidden scrollbar-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10 overflow-hidden scrollbar-hidden">
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
                                <div
                                    className={`absolute inset-0 rounded-xl p-4 bg-white transition-transform duration-500 ease-in-out ${hoveredProject === project.id ? "translate-y-[0%]" : "translate-y-[50%]"
                                        }`}
                                >
                                    <h2 className="text-2xl font-bold">{project.title}</h2>
                                    <div className="flex items-center mt-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={project.avatar} alt={project.creator} />
                                            <AvatarFallback>{project.creator[0]}</AvatarFallback>
                                        </Avatar>
                                        <p className="ml-4">{project.creator}</p>
                                    </div>
                                    <p className="mt-4">{project.description}</p>
                                    <div className="mt-6">
                                        <p className="text-lg font-semibold">
                                            Total Amount Raised: <span className="text-green-600">{project.amountRaised}</span>
                                        </p>
                                        <p className="mt-2">Contributors: {project.contributors}</p>
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
