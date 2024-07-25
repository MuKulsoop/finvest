import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowBigUpDash, Share2, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from './Sidebar';
import FadeIn from './FadeIn';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import UserProfileIcon from './ui/UserProfileIcon';

const ProjectDetailedView = ({ handleUpvote = () => { }, userUpvotes = {} }) => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('/projects.json')
            .then(response => response.json())
            .then(data => {
                const project = data.find(p => p.id === parseInt(projectId));
                setProject(project);
            })
            .catch(error => console.error('Error fetching project data:', error));
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    // Pagination Logic
    const contributions = project.contributions || [];
    const totalPages = Math.ceil(contributions.length / itemsPerPage);
    const currentContributions = contributions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-hidden">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
                    <Sidebar />
                    <FadeIn direction="down" delay={0} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-4 md:px-3 z-[5] line-clamp-1">
                            {project.title}
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0}>
                        <Link to="/projects">
                            <Button variant="outline" className="hidden sm:flex items-center gap-2 text-[#1B7A57] border-[#1B7A57] mr-4">
                                View Projects
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2} >
                        <UserProfileIcon />
                    </FadeIn>
                </header>
                <FadeIn direction="up" delay={0} fullWidth>
                    <div className="w-full mx-auto p-5 gap-6 flex flex-col md:flex-row">
                        {/* Flex-1 Container */}
                        <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
                            <img src={project.image || 'default-image-url.jpg'} alt={project.title || 'No Title'} className="max-h-80 w-full object-cover rounded-lg" />

                            <h1 className="text-3xl font-bold text-gray-800 mt-5">{project.title}</h1>
                            <div className="flex items-center mt-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={project.avatar || 'default-avatar-url.jpg'} alt={project.creator} />
                                    <AvatarFallback>{project.creator.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="ml-2 text-sm font-medium text-gray-600">{project.creator}</p>
                            </div>
                            <p className="mt-4 text-gray-600">{project.description}</p>
                        </div>

                        {/* Flex-2 Container */}
                        <div className="flex-2 bg-white rounded-xl shadow-lg p-8 relative min-w-[30%]">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-start">
                                    <p className="text-green-600 font-semibold md:text-4xl text-3xl">{project.amountRaised}</p>
                                    <span className="bg-[#2FB574] text-white md:text-xs text-[10px] px-3 py-1 rounded-full mt-2">Total Amount Raised</span>
                                </div>
                                <p className="text-gray-600 font-medium text-xl">{project.contributors} contributors</p>
                                <p className="text-green-600 font-semibold md:text-3xl text-2xl">Milestones</p>

                                <div className="absolute top-5 right-5 flex items-center gap-4 p-2 pr-3 rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleUpvote(project.id)}>
                                    <ArrowBigUpDash className={`h-6 w-6 ${userUpvotes[project.id] ? "text-green-500" : "text-gray-600"} transition-colors`} />
                                    {project.upvotes > 0 && (
                                        <span className="text-xs font-semibold text-gray-700">{project.upvotes}</span>
                                    )}
                                </div>
                            </div>

                            <div className="relative my-4 md:mb-10 py-4">
                                {/* Background bar */}
                                <div className="absolute left-[8px] top-0 bottom-0 w-2 bg-gray-200 rounded-full"></div>

                                {/* Progress bar */}
                                {/* <div
                                className="absolute left-[8px] top-0 bottom-0 w-2 bg-[#2FB574] rounded-full transition-all duration-1000 ease-in-out"
                                style={{ height: `${Math.min(project.milestones.length / 10, 1) * 100}%` }}
                            ></div> */}
                                <Link

                                    to={`/projects/${project.id}/milestones`}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <div className="space-y-4 pl-[2px]">
                                        {project.milestones.length ? (
                                            project.milestones.map((milestone, index) => (
                                                <Link
                                                    key={index}
                                                    to={`/projects/${project.id}/milestones`}
                                                    className="flex items-center gap-3 cursor-pointer"
                                                >
                                                    <div className={`h-5 w-5 z-[5] rounded-full ${index < project.milestones.length ? 'bg-gray-300' : 'bg-gray-300'}`} />
                                                    <p className="text-gray-700">{milestone.title}</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <div className="h-5 w-5 rounded-full bg-gray-300" />
                                                <p className="text-gray-600">No milestones available</p>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>

                            <div className="flex flex-col gap-4 py-4">
                                <div className="flex items-center gap-4">
                                    <Button className="bg-[#2FB574] text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">Donate / Invest</Button>
                                    <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57] border rounded-md py-2 px-4 transition-colors hover:bg-[#F5F5F5]">
                                        <Share2 className="h-5 w-5" />
                                        <span className="ml-2">Share</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                <div className="flex-1 mt-8 p-5 rounded-xl shadow-lg ">
                    <h2 className="text-2xl font-semibold text-gray-800">Latest Contributions</h2>
                    <Table className="mt-4">
                        <TableCaption>A list of the latest contributions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Donated at</TableHead>
                                <TableHead>Donor</TableHead>
                                <TableHead>Network</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>USD Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentContributions.length ? (
                                currentContributions.map((contribution, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{new Date(contribution.donatedAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{contribution.donor}</TableCell>
                                        <TableCell>{contribution.network}</TableCell>
                                        <TableCell>{contribution.amount}</TableCell>
                                        <TableCell>${contribution.usdValue}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No contributions available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink

                                        onClick={() => setCurrentPage(index + 1)}
                                        className={currentPage === index + 1 ? 'text-green-600 font-bold' : ''}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailedView;
