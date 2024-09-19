import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Sidebar from '@/components/Sidebar';
import { PlusCircle, Search } from 'lucide-react';
import UserProfileIcon from '@/components/ui/UserProfileIcon';

const PostsPageSkeleton = () => {
    return (
        <div className="flex min-h-screen w-full bg-[#05140D]">
            <div className="flex-1 sm:py-3  bg-[#05140D] overflow-hidden">

                <div className="p-4 md:p-10 grid grid-cols-1 gap-6 w-full">
                    {/* Post Skeletons */}
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} className="bg-[#13261F] text-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row w-full border-0">
                            <div className="flex-1 p-4">
                                <Skeleton className="w-full h-96 rounded-lg bg-[#2C5440]" />
                                <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Skeleton className="h-10 w-10 rounded-full bg-[#2C5440]" />
                                <Skeleton className="ml-2 h-4 w-1/5 bg-[#2C5440]" />
                                </CardHeader>
                                <CardContent className="p-4 flex-grow">
                                    <Skeleton className="h-4 w-full bg-[#2C5440]" />
                                    <Skeleton className="h-4 w-4/5 mt-2 bg-[#2C5440]" />
                                </CardContent>
                                <CardFooter className="flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-16 bg-[#2C5440]" />
                                        <Skeleton className="h-8 w-16 bg-[#2C5440]" />
                                        <Skeleton className="h-8 w-16 bg-[#2C5440]" />
                                    </div>
                                    <Skeleton className="h-10 w-28 bg-[#2C5440]" />
                                </CardFooter>
                            </div>
                            <div className="flex-2 p-4 pt-2 bg-[#13261F] md:border-l border-t md:border-t-0 border-gray-600 min-w-[300px]">
                                <div className="flex flex-col w-full h-full justify-between">
                                    <div className="w-full">
                                        {[...Array(2)].map((_, i) => (
                                            <div key={i} className="flex flex-row w-full items-center justify-start gap-2 mt-2 p-2">
                                             
                                                    <Skeleton className="h-10 w-10 rounded-full bg-[#2C5440]" />
                                                    <Skeleton className="ml-2 h-4 w-1/2 bg-[#2C5440]" />
                                           
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative mt-4 flex flex-row bottom-0 items-center justify-evenly gap-2">
                                        <Skeleton className="h-10 w-full bg-[#2C5440]" />
                                        <Skeleton className="h-10 w-10 bg-[#2C5440]" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostsPageSkeleton;
