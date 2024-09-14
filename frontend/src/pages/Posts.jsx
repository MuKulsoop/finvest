import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HeartIcon, ShareIcon, Search, MessageCircle, Send,PlusCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import { Link } from 'react-router-dom';

const postsData = [
    {
        id: 1,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'Startup One',
        date: 'July 25, 2024',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Our latest milestone achieved with your support! We are excited to announce that we have successfully completed the initial phase of our project and are now moving forward to the next steps.',
        likes: 120,
        shares: 30,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'User One', text: 'Amazing progress!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'User Two', text: 'Keep up the great work!' },
            { id: 3, avatar: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'User Three', text: 'Incredible achievement!' },
            { id: 4, avatar: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'User Four', text: 'So inspiring!' },
        ],
    },
    {
        id: 2,
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Eco Innovators',
        date: 'August 10, 2024',
        image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
        description: 'We have made significant progress in developing sustainable solutions for urban environments. Our latest initiative focuses on reducing carbon emissions through innovative technology.',
        likes: 95,
        shares: 22,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/men/6.jpg', name: 'User Five', text: 'Fantastic work!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/women/7.jpg', name: 'User Six', text: 'Very impressive progress!' },
        ],
    },
    {
        id: 3,
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        name: 'HealthTech Solutions',
        date: 'July 15, 2024',
        image: 'https://plus.unsplash.com/premium_photo-1679917152562-09bb29e555c1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'We are thrilled to announce the launch of our new telemedicine platform designed to provide remote healthcare services to underserved communities. Thank you for your continued support!',
        likes: 150,
        shares: 35,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/women/8.jpg', name: 'User Seven', text: 'This is groundbreaking!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/men/9.jpg', name: 'User Eight', text: 'Much needed innovation!' },
        ],
    },
    {
        id: 4,
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        name: 'Green Earth Initiative',
        date: 'August 1, 2024',
        image: 'https://plus.unsplash.com/premium_photo-1680042813126-d2ad016b28e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Our team is working hard to restore natural habitats and promote biodiversity. This month, we successfully planted over 5,000 trees in deforested areas.',
        likes: 110,
        shares: 28,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/men/11.jpg', name: 'User Nine', text: 'Incredible effort!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/women/12.jpg', name: 'User Ten', text: 'Great initiative!' },
        ],
    },
    {
        id: 5,
        avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
        name: 'TechForGood',
        date: 'July 30, 2024',
        image: 'https://blog.ipleaders.in/wp-content/uploads/2020/04/Wildlife_Conservation.png',
        description: 'Our recent hackathon was a huge success! We developed several new tools to help non-profits manage their resources more effectively.',
        likes: 85,
        shares: 18,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/women/14.jpg', name: 'User Eleven', text: 'Inspiring work!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/men/15.jpg', name: 'User Twelve', text: 'Great job everyone!' },
        ],
    },
    {
        id: 6,
        avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
        name: 'EduCare Initiative',
        date: 'August 5, 2024',
        image: 'https://plus.unsplash.com/premium_photo-1664695710295-b524b34386db?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'We are pleased to share that we have launched new educational programs in remote areas, providing quality education and learning materials to children in need.',
        likes: 130,
        shares: 32,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/men/17.jpg', name: 'User Thirteen', text: 'Education is the key!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/women/18.jpg', name: 'User Fourteen', text: 'Wonderful progress!' },
        ],
    },
    {
        id: 7,
        avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
        name: 'WaterWorks',
        date: 'August 12, 2024',
        image: 'https://plus.unsplash.com/premium_photo-1682437305216-f54f581fe158?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Our water purification project has reached a new milestone. We have successfully installed purification systems in 10 villages, ensuring clean drinking water for thousands of people.',
        likes: 140,
        shares: 40,
        comments: [
            { id: 1, avatar: 'https://randomuser.me/api/portraits/women/20.jpg', name: 'User Fifteen', text: 'This is life-changing!' },
            { id: 2, avatar: 'https://randomuser.me/api/portraits/men/21.jpg', name: 'User Sixteen', text: 'Outstanding achievement!' },
        ],
    },
];


const PostsPage = () => {
    const post = postsData[0];

    return (
        <div className="flex min-h-screen w-full bg-[#05140D] ">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between gap-4 h-16 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-4 md:px-3 z-[5] line-clamp-1">
                            Posts
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-300" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-[#05140D] text-white placeholder-gray-300 pl-8 md:w-[200px] lg:w-[336px] border border-gray-600"
                            />
                        </div>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.1}>
                        <Link to="/posts/new-post">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                                <PlusCircle className="h-5 w-5" />
                                New Post
                            </Button>
                        </Link>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.2}>
                        <UserProfileIcon />
                    </FadeIn>
                </header>
                <FadeIn direction="up" delay={0.2} fullWidth>
                    <div className="p-4 md:p-10 grid grid-cols-1 gap-6 w-full">
                        {postsData.map((post) => (
                            <Card key={post.id} className="bg-[#13261F] text-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row w-full border-0">
                                <div className="flex-1 p-4">
                                    <img src={post.image} alt={post.description} className="w-full h-96 object-cover rounded-lg" />
                                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                                        <Avatar>
                                            <AvatarImage src={post.avatar} alt={post.name} />
                                            <AvatarFallback>{post.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-lg font-semibold">{post.name}</p>
                                            <p className="text-sm text-gray-400">{post.date}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 flex-grow">
                                        <p>{post.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" className="flex items-center gap-1 text-gray-400 mb-0">
                                                <HeartIcon className="w-5 h-5" />
                                                {post.likes}
                                            </Button>
                                            <Button variant="ghost" className="flex items-center gap-1 text-gray-400 mb-0">
                                                <ShareIcon className="w-5 h-5" />
                                                {post.shares}
                                            </Button>
                                            <Button variant="ghost" className="flex items-center gap-1 text-gray-400 mb-0">
                                                <MessageCircle className="w-5 h-5" />
                                                {post.comments.length}
                                            </Button>
                                        </div>
                                        <Button className="bg-[#2FB574] text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                            Invest
                                        </Button>
                                    </CardFooter>
                                </div>
                                <div className="flex-2 p-4 pt-2 bg-[#13261F] md:border-l border-t md:border-t-0 border-gray-600">
                                    <div className="flex flex-col w-full h-full justify-between">
                                        <div className="">
                                            {post.comments.map((comment) => (
                                                <div key={comment.id} className="flex items-start gap-2 mt-2 p-2">
                                                    <Avatar>
                                                        <AvatarImage src={comment.avatar} alt={comment.name} />
                                                        <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-[0.8em] font-semibold text-white">{comment.name}</p>
                                                        <p className="text-sm text-gray-400">{comment.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="relative mt-4 flex flex-row bottom-0 items-center justify-evenly gap-2">
                                            <Input
                                                placeholder="Write a comment..."
                                                className="rounded-lg bg-[#05140D] text-white placeholder-gray-400 pl-4 pr-12 py-2 border-0"
                                            />
                                            <Button className="bg-[#2FB574] text-white py-1 px-4 rounded-lg">
                                                <Send className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};


export default PostsPage;
