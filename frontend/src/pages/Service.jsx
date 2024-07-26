
import { SkeletonCard } from "@/components/ui/SkeletonCard"; // Adjust the path if necessary

const Service = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-5 md:p-10 w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
};

export default Service;
