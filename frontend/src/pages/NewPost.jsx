import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from '@/components/Sidebar';
import FadeIn from '@/components/FadeIn';
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Send } from 'lucide-react';
import UserProfileIcon from '@/components/ui/UserProfileIcon';

function NewPost() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('image', formData.image);

        try {
            const response = await fetch('https://finvest-backend.onrender.com/post/new-post', {
                method: 'POST',
                body: data,
                headers: {
                }
            });

            const result = await response.json();
            console.log('Post created successfully:', result);
            navigate('/posts');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-[#05140D] overflow-hidden">
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.2} fullWidth>
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-4 md:px-3 z-[5] line-clamp-1">
                            New Post
                        </h1>
                    </FadeIn>
                    <FadeIn direction="down" delay={0.2}>
                        <Link to="/posts">
                            <Button variant="outline" className="flex items-center gap-2 text-[#2FB574] border-[#2FB574] bg-[#05140D] hover:bg-[#2FB574] hover:text-white hover:border-[#2FB574] mr-4">
                                View Posts
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
                                                <img src={URL.createObjectURL(formData.image)} alt="Post" className="object-cover h-full w-full" />
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
                                            placeholder="Post Title"
                                            required
                                            className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 focus:outline-none text-xl text-white placeholder:text-gray-100"
                                        />
                                        <Textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            placeholder="Post Content"
                                            required
                                            className="w-full border-0 border-b border-gray-500 bg-[#05140D] focus:ring-0 text-white placeholder:text-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full mt-5 bg-[#2FB574] text-white py-2 rounded-[30px] hover:bg-[#26925e]">
                                Publish Post
                                <Send className="h-5 w-5 mx-3" />
                            </Button>
                        </form>
                    </div>
                </FadeIn>

            </div>
        </div>
    );
}

export default NewPost;
