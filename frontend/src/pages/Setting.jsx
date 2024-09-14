import { useState, useRef, useEffect, useContext } from 'react';
// import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// import Modal from '@/components/Modal';
import { Link, useNavigate } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';
import { WalletContext } from '@/context/WalletContext';
import { PlusCircle, User, Settings, LifeBuoy, LogOut, ChevronRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,

} from "@/components/ui/accordion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sidebar from '@/components/Sidebar';
// import WalletConnectButton from '@/components/WalletConnectButton';
import UserProfileIcon from '@/components/ui/UserProfileIcon';
import FadeIn from '@/components/FadeIn';
// import { walletconnect } from 'web3modal/dist/providers/connectors';

export const Setting = () => {
    const navigate = useNavigate();
    const { wallet, connectWallet } = useContext(WalletContext);
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
    const faqs = [
        {
            question: "How can I reset my password?",
            answer: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email address.",
        },
        {
            question: "How can I contact support?",
            answer: "You can contact support by filling out the form below or by sending an email to support@example.com.",
        },
        {
            question: "What are the support hours?",
            answer: "Our support team is available from Monday to Friday, 9 AM to 6 PM (GMT).",
        },
        {
            question: "How do I update my account information?",
            answer: "To update your account information, log in to your account, go to the 'Settings' page, and update your details under the 'Profile' section.",
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can delete your account by going to the 'Settings' page and selecting the 'Delete Account' option. Please note that this action is irreversible.",
        },
        {
            question: "How do I report a bug or issue?",
            answer: "To report a bug or issue, go to the 'Support' section and fill out the 'Report a Bug' form. Our team will look into it and get back to you as soon as possible.",
        },
        {
            question: "How can I change my notification settings?",
            answer: "To change your notification settings, log in to your account, go to the 'Settings' page, and update your preferences under the 'Notifications' section.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods including credit/debit cards, PayPal, and cryptocurrency. For more details, visit our 'Payment Methods' page.",
        },
        {
            question: "Is my personal information secure?",
            answer: "Yes, we take your privacy and security seriously. We use advanced encryption and security measures to protect your personal information.",
        },
        {
            question: "How can I track my project's progress?",
            answer: "You can track your project's progress by logging in to your account and navigating to the 'My Projects' section. Here, you'll find detailed information and updates on your project's status.",
        },
    ];
    const investorCategory = [
        "Individual", "Community", "Company"
    ];
    const donationCategory = [
        "Startup", "NGO", "Healthcare", "Education", "Environment", "Animal Welfare", "Arts & Culture", "Community Development"
    ];
    const categories1 = [
        "India", "United States", "United Kingdom", "Japan", "Denmark", "Finland", "Yemen", "Oman", "Qatar", "Zimbabwe", "Iran", "Russia", "Algeria", "Sweden", "Netherlands", "Australia", "France", "Poland", "New Zealand", "Germany", "Switzerland"
    ];
    const themes = [
        "Dark", "Light", "System"
    ]

    const fonts = [
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Oswald',
        'Source Sans Pro',
        'Raleway',
        'Poppins',
        'Merriweather',
        'Ubuntu',
        'Nunito',
        'PT Sans',
        'Lora',
        'Playfair Display',
        'Mukta',
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
        navigate('/dashboard');
    };

    const scrollToSection = (section) => {
        const isSectionFilled = validateSection(section);
        if (isSectionFilled) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
            <div className="flex-1 sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden scrollbar-hidden bg-[#05140D]">
                <header className="fixed top-0 lg:pt-4 w-full sm:w-[calc(100%-56px)] z-30 flex items-center justify-between h-14 lg:h-20 px-4 bg-[#05140D] border-b border-gray-700">
                    <Sidebar />
                    <FadeIn direction="down" delay={0.1} fullWidth className="justify-start">
                        <h1 className="md:text-4xl text-2xl font-semibold text-left text-white w-full px-2 pl-4 md:px-3 z-[5]">Settings</h1>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.1}>
                        <UserProfileIcon />
                    </FadeIn>
                </header>


                <div className="flex flex-col w-full mt-16 gap-10 items-center">
                    {/* <FadeIn direction='down' delay={0.2} fullWidth> */}
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>

                        <div className="flex flex-col w-full lg:flex-row  lg:justify-evenly lg:gap-10">
                            <div className="flex-2 flex lg:min-w-[20%] flex-col bg-[#05140D] lg:pl-10 py-5 rounded-[30px]">
                                <nav className="fixed w-[200px] hidden lg:flex flex-col items-start justify-start gap-4 z-[1]">
                                    <a
                                        href="#profile-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'profile-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('profile');
                                        }}
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="#account-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'account-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('account');
                                        }}
                                    >
                                        Account
                                    </a>
                                    <a
                                        href="#appearance-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'appearance-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('appearance');
                                        }}
                                    >
                                        Appearance
                                    </a>
                                    <a
                                        href="#notification-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'notification-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('notification');
                                        }}
                                    >
                                        Notification
                                    </a>
                                    <a
                                        href="#support-section"
                                        className={`relative flex w-full items-center p-2 pl-4 rounded-lg transition-colors text-lg text-left ${activeSection === 'support-section' ? 'hover:bg-[#2C5440] bg-[#2FB574] text-white' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                        onClick={() => {
                                            scrollToSection('support');
                                        }}
                                    >
                                        Support
                                    </a>
                                </nav>

                                {/* Navigation for smaller screens */}
                                <nav className="fixed top-12 md:w-[calc(100%-56px)] lg:hidden flex items-center justify-between bg-[#05140D] p-2 pt-4 shadow-md w-full z-[1]">
                                    <div className="flex justify-evenly w-full overflow-scroll scrollbar-hidden">
                                        <a
                                            href="#profile-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'profile-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('profile');
                                            }}
                                        >
                                            Profile
                                        </a>
                                        <a
                                            href="#account-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'account-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('account');
                                            }}
                                        >
                                            Account
                                        </a>
                                        <a
                                            href="#appearance-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'appearance-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('appearance');
                                            }}
                                        >
                                            Appearance
                                        </a>
                                        <a
                                            href="#notification-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'notification-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('notification');
                                            }}
                                        >
                                            Notification
                                        </a>
                                        <a
                                            href="#support-section"
                                            className={`flex items-center p-2 rounded-lg transition-colors text-sm ${activeSection === 'support-section' ? 'bg-[#2C5440] hover:bg-[#2FB574]' : 'bg-[#1A3A2C] hover:bg-[#2C5440] text-white'}`}
                                            onClick={() => {
                                                scrollToSection('support');
                                            }}
                                        >
                                            Support
                                        </a>
                                    </div>
                                </nav>
                            </div>

                            <div className="flex-1 py-8 md:pr-10 px-10 rounded-[30px]">
                                <section ref={sectionRefs.profile} id="profile-section" className="scroll-mt-40 lg:scroll-mt-24 min-h-screen text-white">
                                    <div className="text-3xl md:text-4xl font-bold pb-4 md:pb-8">Let's set your profile</div>
                                    <div className="relative mb-6 flex flex-row items-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleImageChange}
                                        />
                                        <div className="h-24 w-24 md:h-32 md:w-32 bg-[#1A3A2C] border-4 border-[#2C5440] rounded-full flex items-center justify-center overflow-hidden">
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
                                            className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 focus:outline-none text-xl text-white placeholder:text-gray-100"
                                            placeholder="Username"
                                        />
                                        <Textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                                            placeholder="A brief description about you"
                                        />
                                        <Input
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                                            placeholder="Your contact info"
                                        />
                                        {userType === 'investor' ? (
                                            <div className="space-y-2">
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={handleCategoryChange}
                                                    required
                                                >
                                                    <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
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
                                                        <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
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
                                                        className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2 placeholder:text-gray-100"
                                                        required
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <Select
                                            value={formData.category1}
                                            onValueChange={handleCategoryChange1}
                                            placeholder="Country"
                                            className="w-full bg-transparent focus:ring-0 text-white px-2 py-2 placeholder:text-gray-100"
                                            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                                            onFocus={(e) => e.target.style.boxShadow = 'none'}
                                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                                        >
                                            <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white px-2 py-2">
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
                                        <a
                                            href="#account-section"
                                            className={`relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]`}
                                            onClick={() => {
                                                scrollToSection('account');
                                            }}
                                        >
                                            Next
                                            <ChevronRight className="h-5 w-5" />
                                        </a>
                                    </div>
                                </section>

                                <section ref={sectionRefs.account} id="account-section" className="scroll-mt-40 lg:scroll-mt-28 min-h-screen text-white">
                                    <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
                                        <h2 className="text-3xl md:text-4xl font-semibold text-left mb-6 md:mb-10 text-white">Account</h2>
                                        <div className="space-y-6">
                                            {/* Connect Wallet */}
                                            <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Connect Wallet</div>
                                                <div className="flex flex-wrap justify-center gap-4">
                                                    <Button
                                                        onClick={() => connectWallet()}
                                                        className="flex items-center justify-center bg-black hover:bg-stone-700 rounded-md p-4 transition ease-in-out w-32 text-center text-white"
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
                                                        className="flex items-center justify-center bg-[#f5f6fc] hover:bg-[#dfe8ff] rounded-md p-4 transition ease-in-out w-32 md:w-36 text-center text-white"
                                                    >
                                                        <img
                                                            src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                                                            alt="WalletConnect"
                                                            className="h-8 w-8 mr-2"
                                                        />
                                                        <span className="hidden md:inline text-blue-400">WalletConnect</span>
                                                    </Button>
                                                    <Button
                                                        // onClick={() => handleConnectWallet('coinbase')}
                                                        className="flex items-center justify-center bg-blue-700 hover:bg-blue-800 rounded-md p-4 transition ease-in-out w-32 text-center text-white"
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
                                                        className="flex items-center justify-center bg-black hover:bg-black rounded-md p-4 transition ease-in-out w-32 text-center text-white"
                                                    >
                                                        <img
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPzg2XYOEViDrxbNnm_5XNLyGu8YAPhb0S9g&s"
                                                            alt="Trust Wallet"
                                                            className="h-8 w-8 mr-2"
                                                        />
                                                        <span className="hidden md:inline">Trust Wallet</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Change Password */}
                                            <div className="space-y-4">
                                                <div className="text-xl md:text-2xl font-semibold">Change Passwords <span className='text-sm text-gray-500'>(Not Compulsory)</span></div>
                                                <Input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                                                    placeholder="Current Password"
                                                />
                                                <Input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                                                    placeholder="New Password"
                                                />
                                                <Input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border-0 border-b border-[#2C5440] bg-transparent focus:ring-0 text-white placeholder:text-gray-100"
                                                    placeholder="Confirm New Password"
                                                />
                                                <Button
                                                    // onClick={handleChangePassword}
                                                    className="w-full bg-[#2FB574] text-white py-2 rounded-md hover:bg-[#26925e]"
                                                >
                                                    Change Password
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href="#appearance-section"
                                        className="relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]"
                                        onClick={() => {
                                            scrollToSection('appearance');
                                        }}
                                    >
                                        Next
                                        <ChevronRight className="h-5 w-5" />
                                    </a>
                                </section>

                                <section ref={sectionRefs.appearance} id="appearance-section" className="scroll-mt-40 min-h-screen text-white">
                                    <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
                                        <h2 className="text-3xl md:text-4xl text-left font-semibold mb-6 md:mb-10 text-white">Appearance</h2>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="theme" className="text-white">Theme</Label>
                                                <Select value={formData.theme}>
                                                    <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent text-white placeholder:text-gray-100">
                                                        <SelectValue placeholder="Select a theme" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {themes.map((theme, index) => (
                                                            <SelectItem key={index} value={theme} className="text-white">
                                                                {theme}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="font" className="text-white">Font</Label>
                                                <Select value={formData.font}>
                                                    <SelectTrigger className="w-full border-0 border-b border-[#2C5440] bg-transparent text-white placeholder:text-gray-100">
                                                        <SelectValue placeholder="Select a font" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {fonts.map((font, index) => (
                                                            <SelectItem key={index} value={font} className="text-white">
                                                                {font}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="color" className="text-white">Primary Color</Label>
                                                <Input
                                                    id="color"
                                                    name="color"
                                                    type="color"
                                                    value={formData.color}
                                                    onChange={handleChange}
                                                    className="h-20 w-20 rounded-lg border-0 focus:ring-0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="#notification-section"
                                        className="relative flex w-[80px] text-center items-center p-2 pl-4 rounded-full transition-colors text-md text-white bg-[#2FB574] hover:bg-[#26925e]"
                                        onClick={() => {
                                            scrollToSection('notification');
                                        }}
                                    >
                                        Next
                                        <ChevronRight className="h-5 w-5" />
                                    </a>
                                </section>

                                <section ref={sectionRefs.notification} id="notification-section" className="scroll-mt-40 min-h-screen text-white">
                                    <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
                                        <h2 className="text-3xl md:text-4xl text-left font-semibold mb-6 md:mb-10 text-white">Notification</h2>
                                        <div className="space-y-6">
                                            {/* Email Notifications */}
                                            <div className="space-y-2">
                                                <Label htmlFor="emailNotifications" className="text-white">Email Notifications</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="emailNotifications"
                                                        checked={formData.emailNotifications === "enable"}
                                                        className="bg-[#2FB574] checked:bg-[#26925e]" // Green theme for enabled
                                                    />
                                                    <Label htmlFor="emailNotifications" className="text-white">
                                                        {formData.emailNotifications === "enable" ? "Enable" : "Disable"}
                                                    </Label>
                                                </div>
                                            </div>

                                            {/* SMS Notifications */}
                                            <div className="space-y-2">
                                                <Label htmlFor="smsNotifications" className="text-white">SMS Notifications</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="smsNotifications"
                                                        checked={formData.smsNotifications === "enable"}
                                                        className="bg-[#2FB574] checked:bg-[#26925e]"
                                                    />
                                                    <Label htmlFor="smsNotifications" className="text-white">
                                                        {formData.smsNotifications === "enable" ? "Enable" : "Disable"}
                                                    </Label>
                                                </div>
                                            </div>

                                            {/* Push Notifications */}
                                            <div className="space-y-2">
                                                <Label htmlFor="pushNotifications" className="text-white">Push Notifications</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        id="pushNotifications"
                                                        checked={formData.pushNotifications === "enable"}
                                                        className="bg-[#2FB574] checked:bg-[#26925e]"
                                                    />
                                                    <Label htmlFor="pushNotifications" className="text-white">
                                                        {formData.pushNotifications === "enable" ? "Enable" : "Disable"}
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-start mt-10">
                                        <Link to="/dashboard">
                                            <Button variant="default" size="lg" type="submit" className="bg-[#05140D] text-white hover:bg-[#2C5440]">
                                                Save Settings
                                            </Button>
                                        </Link>
                                    </div>
                                </section>

                                <section ref={sectionRefs.support} id="support-section" className="scroll-mt-28 min-h-screen text-white">
                                    <div className="bg-[#1A3A2C] rounded-[30px] p-6 md:p-10 mb-10">
                                        <h2 className="text-3xl md:text-4xl font-semibold text-left mb-6 md:mb-10 text-white">Support</h2>
                                        <div className="space-y-6">

                                            {/* Message Us */}
                                            <div className="space-y-4">
                                                <Label htmlFor="supportMessage" className="text-white">Message Us</Label>
                                                <Textarea
                                                    id="supportMessage"
                                                    name="supportMessage"
                                                    value={formData.supportMessage}
                                                    onChange={handleInputChange}
                                                    placeholder="Describe your issue or question"
                                                    required
                                                    className="bg-[#05140D] text-white placeholder-gray-500 border border-[#2C5440] rounded-lg p-3"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <Button onClick={handleSubmit} className="bg-[#2FB574] text-white py-2 rounded-md hover:bg-[#26925e]">
                                                Submit
                                            </Button>

                                            {/* FAQ Section */}
                                            <div className="mt-10">
                                                <h3 className="text-xl md:text-2xl font-semibold text-left mb-6 md:mb-8 text-white">Frequently Asked Questions</h3>
                                                <Accordion type="single" collapsible className="w-full">
                                                    {faqs.map((faq, index) => (
                                                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#2C5440] mb-2">
                                                            <AccordionTrigger
                                                                className="text-sm md:text-md py-4 px-6 font-semibold text-white bg-[#2C5440] rounded-md hover:bg-[#26925e] transition-colors duration-300"
                                                            >
                                                                {faq.question}
                                                            </AccordionTrigger>
                                                            <AccordionContent
                                                                className="text-base p-6 text-white bg-[#05140D] rounded-md"
                                                            >
                                                                {faq.answer}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </div>

                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </form>
                    {/* </FadeIn> */}

                </div>
            </div>
        </div>
    );
};
