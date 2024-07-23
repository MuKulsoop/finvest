import { useState, useRef, useEffect } from 'react';
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

    const [activeSection, setActiveSection] = useState('profile');

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

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6,
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);

    return (
        <div className="flex min-h-screen w-full overflow-hidden scrollbar-hidden">
            <div className="flex-1 sm:py-3 sm:pl-14 bg-white overflow-auto scrollbar-hidden">
                <header className="fixed top-0  w-full sm:w-[calc(100%-56px)] z-30 flex items-center justify-between p-4 bg-white border-b border-gray-200">
                    <Sidebar />
                    <h1 className="md:text-4xl text-2xl font-semibold text-left text-[#05140D] w-full px-2 pl-4 md:px-3 z-[5]">Settings</h1>
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
                            <div className="flex-2 hidden lg:flex lg:min-w-[20%] flex-col bg-background md:pl-10 py-10 rounded-[30px]">
                                <nav className="fixed w-[200px] hidden lg:flex flex-col items-start justify-start gap-4">
                                    <a
                                        href="#profile-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'profile-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => {

                                            scrollToSection('profile');
                                        }}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#account-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'account-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => {

                                            scrollToSection('account');
                                        }}
                                    >
                                        Account
                                    </a>

                                    <a
                                        href="#appearance-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'appearance-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => {

                                            scrollToSection('appearance');
                                        }}
                                    >
                                        Appearance
                                    </a>
                                    <a
                                        href="#notification-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'notification-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => {

                                            scrollToSection('notification');
                                        }}
                                    >
                                        Notification
                                    </a>
                                    <a
                                        href="#support-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'support-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                        onClick={() => {

                                            scrollToSection('support');
                                        }}
                                    >
                                        Support
                                    </a>
                                </nav>
                                {/* Navigation for smaller screens */}
                                <nav className="fixed top-16 left-14 md:w-[calc(100%-56px)] lg:hidden flex items-center justify-between bg-background p-2  pt-4 shadow-md w-full">
                                    <div className="flex justify-evenly w-full overflow-scroll scrollbar-hidden">
                                        <a
                                            href="#profile-section"
                                            className={`flex items-center p-2  rounded-lg transition-colors text-sm ${activeSection === 'profile-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => {
                                                scrollToSection('profile');
                                            }}
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#account-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'account-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => {
                                                scrollToSection('account');
                                            }}
                                        >
                                            Account
                                        </a>
                                        <a
                                            href="#appearance-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'appearance-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => {
                                                scrollToSection('appearance');
                                            }}
                                        >
                                            Appearance
                                        </a>
                                        <a
                                            href="#notification-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'notification-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => {
                                                scrollToSection('notification');
                                            }}
                                        >
                                            Notification
                                        </a>
                                        <a
                                            href="#support-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'support-section' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => {
                                                scrollToSection('support');
                                            }}
                                        >
                                            Support
                                        </a>
                                    </div>
                                </nav>
                            </div>
                            <div className="flex-1 py-10 md:pr-10 px-10 rounded-[30px]">
                                <section ref={sectionRefs.profile} id="profile-section" className="scroll-mt-40 min-h-screen">
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
                                        <Input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0 focus:outline-none text-xl"
                                            placeholder="Username"
                                        />
                                        <Textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                            placeholder="A brief description about you"
                                        />
                                        <Input
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                            placeholder="Your contact info"
                                        />
                                        {userType === 'investor' ? (
                                            <div className="space-y-2">
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={handleCategoryChange}
                                                    required
                                                >
                                                    <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                        <SelectValue placeholder="Donor Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {investorCategory.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="space-y-2">
                                                    <Select
                                                        value={formData.category}
                                                        onValueChange={handleCategoryChange}
                                                        required
                                                    >
                                                        <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                            <SelectValue placeholder="Donee type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {donationCategory.map((category) => (
                                                                <SelectItem key={category} value={category}>
                                                                    {category}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Textarea
                                                        id="motive"
                                                        name="motive"
                                                        placeholder="Why are you looking for funding?"
                                                        value={formData.motive}
                                                        onChange={handleChange}
                                                        className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2"
                                                        required
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <Select
                                            value={formData.category1}
                                            onValueChange={handleCategoryChange1}
                                            placeholder="Country"
                                            className="w-full focus:ring-0 text-gray-500 px-2 py-2"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-gray-300 focus:ring-0 text-gray-500 px-2 py-2">
                                                <SelectValue placeholder="Select Country" />
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
                                </section>


                                <section
                                    ref={sectionRefs.account}
                                    id="account-section"
                                    className="scroll-mt-40 min-h-screen"
                                >
                                    <div className="bg-background   rounded-[30px] mb-10">
                                        <h2 className="md:text-4xl font-semibold text-left text-2xl  mb-6 md:mb-10 text-[#05140D]">Account</h2>
                                        <div className="space-y-6">
                                            {/* Connect Wallet */}
                                            <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Connect Wallet</div>
                                                <div className="flex flex-wrap justify-center gap-4">
                                                    <Button
                                                        // onClick={() => handleConnectWallet('metamask')}
                                                        className="flex items-center justify-center bg-black hover:bg-stone-700 rounded-md p-4 transition ease-in-out w-32 text-center"
                                                    >
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png"
                                                            alt="MetaMask"
                                                            className="h-8 w-8 mr-2"
                                                        />
                                                        <span className="hidden md:inline">MetaMask</span>
                                                    </Button>
                                                    <Button
                                                        // onClick={() => handleConnectWallet('walletconnect')}
                                                        className="flex items-center justify-center bg-gray-100 hover:bg-gray-300 rounded-md p-4 transition ease-in-out  text-center"
                                                    >
                                                        <img
                                                            src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                                                            alt="WalletConnect"
                                                            className="h-8 w-8 mr-2"
                                                        />
                                                        <span className="hidden md:inline text-blue-800">WalletConnect</span>
                                                    </Button>
                                                    <Button
                                                        // onClick={() => handleConnectWallet('coinbase')}
                                                        className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-md p-4 transition ease-in-out w-32 text-center"
                                                    >
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYBPjqJ_GAeLOQD6fK4jm_CiOAdwVko_-fPVvptet2AIglUUB47h5EyEZs_nreE_xpZk&usqp=CAU"
                                                            alt="Coinbase"
                                                            className="h-8 w-8 mr-2 rounded-full"
                                                        />
                                                        <span className="hidden md:inline">Coinbase</span>
                                                    </Button>
                                                    <Button
                                                        // onClick={() => handleConnectWallet('trustwallet')}
                                                        className="flex items-center justify-center bg-black hover:bg-black rounded-md p-4 transition ease-in-out w-32 text-center"
                                                    >
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPzg2XYOEViDrxbNnm_5XNLyGu8YAPhb0S9g&s"
                                                            alt="Trust Wallet"
                                                            className="h-8 w-8 mr-2 "
                                                        />
                                                        <span className="hidden md:inline">Trust Wallet</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Change Password */}
                                            <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Change Password</div>
                                                <Input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="Current Password"
                                                />
                                                <Input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="New Password"
                                                />
                                                <Input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="Confirm New Password"
                                                />
                                                <Button
                                                    // onClick={handleChangePassword}
                                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Change Password
                                                </Button>
                                            </div>



                                            {/* Account Settings */}
                                            {/* <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Account Settings</div>
                                                <Input
                                                    type="text"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="Email Address"
                                                />
                                                <Input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="Phone Number"
                                                />
                                                <Input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    className="w-full border-0 border-b border-gray-300 focus:ring-0"
                                                    placeholder="Address"
                                                />
                                                <Button
                                                    // onClick={handleUpdateAccount}
                                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                                >
                                                    Update Account
                                                </Button>
                                            </div> */}

                                            {/* Notification Settings */}
                                            {/* <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Notification Settings</div>
                                                <div className="flex flex-col space-y-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="emailNotifications"
                                                            checked={formData.emailNotifications}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        <label>Email Notifications</label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="smsNotifications"
                                                            checked={formData.smsNotifications}
                                                            onChange={handleChange}
                                                            className="mr-2"
                                                        />
                                                        <label>SMS Notifications</label>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </section>




                                <section
                                    ref={sectionRefs.appearance}
                                    id="appearance-section"
                                    className="scroll-mt-40 min-h-screen"
                                >
                                    <div className="bg-background shadow-md p-6 sm:p-10 rounded-[30px] mb-10">
                                        <h2 className="md:text-4xl text-2xl text-center mb-6 md:mb-10 text-[#05140D]">Appearance</h2>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="theme">Theme</Label>
                                                <Select
                                                    value={formData.theme}
                                                    // onValueChange={handleThemeChange}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a theme" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {/* {themes.map((theme, index) => (
                                                            <SelectItem key={index} value={theme}>
                                                                {theme}
                                                            </SelectItem>
                                                        ))} */}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="font">Font</Label>
                                                <Select
                                                    value={formData.font}
                                                    // onValueChange={handleFontChange}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a font" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {/* {fonts.map((font, index) => (
                                                            <SelectItem key={index} value={font}>
                                                                {font}
                                                            </SelectItem>
                                                        ))} */}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="color">Primary Color</Label>
                                                <Input
                                                    id="color"
                                                    name="color"
                                                    type="color"
                                                    value={formData.color}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section
                                    ref={sectionRefs.notification}
                                    id="notification-section"
                                    className="scroll-mt-40 min-h-screen"
                                >
                                    <div className="bg-background shadow-md p-6 sm:p-10 rounded-[30px] mb-10">
                                        <h2 className="md:text-4xl text-2xl text-center mb-6 md:mb-10 text-[#05140D]">Notification</h2>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="emailNotifications">Email Notifications</Label>
                                                <Select
                                                    value={formData.emailNotifications}
                                                    // onValueChange={handleEmailNotificationsChange}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Enable/Disable" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="enable">Enable</SelectItem>
                                                        <SelectItem value="disable">Disable</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                                                <Select
                                                    value={formData.smsNotifications}
                                                    // onValueChange={handleSmsNotificationsChange}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Enable/Disable" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="enable">Enable</SelectItem>
                                                        <SelectItem value="disable">Disable</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pushNotifications">Push Notifications</Label>
                                                <Select
                                                    value={formData.pushNotifications}
                                                    // onValueChange={handlePushNotificationsChange}
                                                    required
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Enable/Disable" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="enable">Enable</SelectItem>
                                                        <SelectItem value="disable">Disable</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section
                                    ref={sectionRefs.support}
                                    id="support-section"
                                    className="scroll-mt-40 min-h-screen"
                                >
                                    <div className="bg-background shadow-md p-6 sm:p-10 rounded-[30px] mb-10">
                                        <h2 className="md:text-4xl text-2xl text-center mb-6 md:mb-10 text-[#05140D]">Support</h2>
                                        <div className="space-y-6">
                                            {/* Add your support settings fields here */}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="flex justify-center mt-10">
                            <Button variant="default" size="lg" type="submit">
                                Save Settings
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
