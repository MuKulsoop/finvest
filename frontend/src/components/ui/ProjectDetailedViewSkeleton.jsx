
import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailedViewSkeleton = () => (
    <div className="flex min-h-screen w-full bg-gray-100">
        <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-hidden w-full">
            {/* Header Skeleton */}
            <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
                {/* <Skeleton className="h-10 w-10 rounded-full" /> */}
                <Skeleton className="h-8 w-2/5" />
                <div className="flex flex-row items-center gap-4">
                    <Skeleton className="h-10 w-32 hidden sm:block" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

            </header>
            <div className="w-full mx-auto p-5 gap-6 flex flex-col md:flex-row">
                {/* Flex-1 Container Skeleton */}
                <div className="flex-1 bg-white rounded-xl shadow p-8">
                    <Skeleton className="h-80 w-full rounded-lg" />
                    <Skeleton className="h-10 w-3/5 mt-5" />
                    <div className="flex items-center mt-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-1/3 ml-2" />
                    </div>
                    <Skeleton className="h-6 w-full mt-4" />
                    <Skeleton className="h-6 w-4/5 mt-2" />
                </div>

                {/* Flex-2 Container Skeleton */}
                <div className="flex-2 bg-white rounded-xl shadow p-8 relative min-w-[30%] items-center">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-start">
                            <Skeleton className="h-10 w-3/5" />
                            <Skeleton className="h-5 w-24 mt-2" />
                        </div>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-8 w-2/5" />
                    </div>

                    <div className="relative my-4 md:mb-10 py-4">
                        <Skeleton className="absolute left-[8px] top-0 bottom-0 w-2  rounded-full" />

                        <div className="space-y-4 pl-[2px]">
                            <div className="flex flex-row items-center gap-4">
                                <Skeleton className="h-5 w-5 rounded-full" />

                                <Skeleton className="h-6 w-4/5" />
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <Skeleton className="h-5 w-5 rounded-full" />

                                <Skeleton className="h-6 w-4/5" />
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <Skeleton className="h-5 w-5 rounded-full" />

                                <Skeleton className="h-6 w-4/5" />
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <Skeleton className="h-5 w-5 rounded-full" />

                                <Skeleton className="h-6 w-4/5" />
                            </div>

                        </div>


                    </div>

                    <div className="flex flex-row gap-4 py-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ProjectDetailedViewSkeleton;
