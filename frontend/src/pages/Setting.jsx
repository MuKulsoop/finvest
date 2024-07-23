import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import Modal from '@/components/Modal';
import { Link, useNavigate } from 'react-router-dom';

import { PlusCircle, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from '@/components/Sidebar';
import WalletConnectButton from '@/components/WalletConnectButton';

export const Setting = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('investor'); // 'investor' or 'lookingForFunding'
    const [formData, setFormData] = useState({
        username: '',
        bio: '',
        contact: '',
        category: '',
        category1: '',
        image: '',
        motive: '', // For users looking for funding
    });

    const investorCategory = [
        "Individual", "Community", "Company"
    ];
    const donationCategory = [
        "Startup", "NGO", "Healthcare", "Education", "Environment", "Animal Welfare", "Arts & Culture", "Community Development"
    ];
    const categories1 = [
        "India", "United States", "United Kingdom", "Japan", "Denmark", "Finland", "Yemen", "Oman", "Qatar", "Zimbabwe", "Iran", "Russia", "Algeria", "Sweden", "Netherlands", "Australia", "France", "Poland", "New Zealand", "Germany", "Switzerland"
    ];

    const sectionRefs = {
        profile: useRef(null),
        account: useRef(null),
        support: useRef(null),
        appearance: useRef(null),
        notification: useRef(null),
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleCategoryChange1 = (value) => {
        setFormData({ ...formData, category1: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate('/account');
    };

    const scrollToSection = (section) => {
        const isSectionFilled = validateSection(section);
        if (isSectionFilled) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const validateSection = (section) => {
        switch (section) {
            case 'profile':
                return formData.username && formData.bio && formData.contact && formData.category1;
            case 'account':
                return true;
            case 'support':
                return true;
            case 'appearance':
                return true;
            case 'notification':
                return true;
            default:
                return false;
        }
    };

    // const [isModalOpen, setModalOpen] = useState(false);
    // const [search, setSearch] = useState('');
    // const [selectedWallet, setSelectedWallet] = useState('');

    // const popularWallets = [
    //     "MetaMask",
    //     "WalletConnect",
    //     "Safe",
    //     "Trust Wallet",
    // ];

    // const allWallets = [
    //     ...popularWallets,
    //     "Coinbase Wallet",
    //     "Binance Chain Wallet",
    //     "Mycelium",
    //     "Exodus",
    //     "Fortmatic",
    //     // Add more wallets as needed
    // ];

    // const handleOpenModal = () => setModalOpen(true);
    // const handleCloseModal = () => setModalOpen(false);

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-auto scrollbar-hidden">
                <header className="fixed top-0 left-14 w-[95%]  z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <Sidebar />
                    <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-fullpx-2 pl-4 md:px-3 z-[5]">Settings</h1>
                    <div className='flex flex-row'>
                    <Link to="/post-project">
                        <Button variant="outline" className="flex items-center gap-2 text-[#1B7A57] border-[#1B7A57] mr-4">
                            <PlusCircle className="h-5 w-5" />
                            Post a Project
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full h-10 w-10">
                                <User className="h-7 w-8" />
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
                    </div>
                </header>

                <div className="flex flex-col w-full mt-16 gap-10 items-center">
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full md:flex-row justify-evenly gap-10">
                            <div className="flex-2 min-w-[20%] flex-col bg-background pl-10 py-10 rounded-[30px]">
                                <nav className="fixed w-[200px] hidden md:flex flex-col items-start justify-start gap-4">
                                    <a
                                        href="#profile-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${validateSection('profile') ? 'bg-white hover:bg-gray-200' : 'bg-gray-200 '}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('profile');
                                        }}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#account-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${validateSection('account') ? 'bg-white hover:bg-gray-200' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('account');
                                        }}
                                    >
                                        Account
                                    </a>
                                    <a
                                        href="#support-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${validateSection('support') ? 'bg-white hover:bg-gray-200' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('support');
                                        }}
                                    >
                                        Support
                                    </a>
                                    <a
                                        href="#appearance-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${validateSection('appearance') ? 'bg-white hover:bg-gray-200' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('appearance');
                                        }}
                                    >
                                        Appearance
                                    </a>
                                    <a
                                        href="#notification-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${validateSection('notification') ? 'bg-white hover:bg-gray-200' : 'bg-gray-200 cursor-not-allowed'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection('notification');
                                        }}
                                    >
                                        Notification
                                    </a>
                                </nav>
                            </div>
                            <div className="flex-1 py-10 pr-10 rounded-[30px] w-full">
                                <div ref={sectionRefs.profile} id="profile-section" className="min-h-screen flex flex-col justify-center">
                                    <div className="text-2xl md:text-4xl font-bold pb-4 md:pb-8">Let's set your profile</div>
                                    <div className="relative mb-6 flex flex-row items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="h-24 w-24 md:h-48 md:w-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                            {formData.image ? (
                                                <img src={formData.image} alt="Profile" className="object-cover h-full w-full" />
                                            ) : (
                                                <p className="text-gray-400 md:text-2xl text-md text-center font-semibold">Upload Image</p>
                                            )}
                                        </div>
                                        <div className="text-xl md:text-2xl pl-5">Click to upload</div>
                                    </div>
                                    <div className="space-y-4">

                                        {/* <label className="text-lg md:text-2xl">Username</label> */}
                                        <Input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none text-xl"
                                            placeholder="Username"

                                        />

                                        {/* <label className="text-lg md:text-2xl">Bio</label> */}
                                        <Textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                            placeholder="A brief description about you"
                                        />


                                        {/* <label className="text-lg md:text-2xl">Contact</label> */}
                                        <Input
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"

                                            placeholder="Your contact info"
                                        />

                                        {/* <label className="text-lg md:text-2xl">Category</label> */}
                                        <Select
                                            value={formData.category1}
                                            onValueChange={handleCategoryChange1}
                                            placeholder="Investor Type"
                                            className="w-full  focus:ring-0 text-gray-500 px-2 py-2"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories1.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>


                                    </div>

                                </div>
                                <div ref={sectionRefs.account} id="account-section" className="min-h-screen flex flex-col justify-center">
                                    <div className="text-2xl md:text-4xl font-bold pb-4 md:pb-8">Account Settings</div>
                                    <div className="space-y-6">
                                        <Label htmlFor="wallet-connect" className="block text-sm font-medium text-gray-700 mb-2">Connect Your Wallet</Label>
                                        <WalletConnectButton />

                                    </div>
                                </div>
                                <div ref={sectionRefs.support} id="support-section" className="min-h-screen flex flex-col justify-center">
                                    <div className="text-2xl md:text-4xl font-bold pb-4 md:pb-8">Support</div>
                                    {/* Support form fields */}
                                </div>
                                <div ref={sectionRefs.appearance} id="appearance-section" className="min-h-screen flex flex-col justify-center">
                                    <div className="text-2xl md:text-4xl font-bold pb-4 md:pb-8">Appearance</div>
                                    {/* Appearance form fields */}
                                </div>
                                <div ref={sectionRefs.notification} id="notification-section" className="min-h-screen flex flex-col justify-center">
                                    <div className="text-2xl md:text-4xl font-bold pb-4 md:pb-8">Notification</div>
                                    {/* Notification form fields */}
                                </div>
                                <div className="flex justify-end mt-6">
                                    <Button type="submit" className="bg-primary-500 text-white">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
