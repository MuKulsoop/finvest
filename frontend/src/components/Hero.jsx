import { Play } from "lucide-react";
import { Button } from "./ui/button";
import FadeIn from "./FadeIn";
import '../App.css';

function Hero() {
    return (
        <div className="hero relative flex flex-col items-center justify-center w-full  bg-[#05140D] p-5 py-10 md:pb-20 pb-10">
            <img
                className="absolute w-full top-0 left-0 z-[1]"
                src="https://res.cloudinary.com/djoebsejh/image/upload/v1721131421/nwtojjwtzniome9r5jt1.svg"
                alt="Background"
            />
            <FadeIn direction="down" delay={0.3} fullWidth>
                <h1 className="text-5xl lg:w-[60%] md:text-7xl font-semibold text-center py-3 z-[5] gradient-text">
                    We make it easy for everyone to invest
                </h1>

            </FadeIn>
            <FadeIn direction="down" delay={0.3} fullWidth>
                <h3 className="md:text-xl  text-center py-3 z-[5] lg:w-[55%] font-semibold bg-gradient-to-b from-white via-green-100 to-green-200 bg-clip-text text-transparent">
                    Investment is a term with several meanings related to finance and economics. The term relates to the accumulation of assets in the forms of an expectation of future profits.
                </h3>
            </FadeIn>

            {/* <FadeIn direction="up" delay={0.3} fullWidth></FadeIn> */}
            <div className="flex flex-col items-center justify-center py-5 z-[5] md:flex-row ">
                <FadeIn direction="right" delay={0.3} fullWidth>
                    <Button variant="custom" size="nm">Get Started</Button>
                </FadeIn>
                <FadeIn direction="left" delay={0.3} fullWidth>
                    <Button variant="ghost" size="nm">
                        <Play className="cursor-pointer mr-2 bg-[#2FB574] rounded-[50px] p-1  h-[35px] w-[35px] fill-black rotate-hover" />
                        Watch Demo
                    </Button>
                </FadeIn>

            </div>
            <div className="flex xl:flex-row flex-col items-center justify-center w-full overflow-hidden mx-auto max-w-[1400px] ">
                <FadeIn direction="right" delay={0.3} fullWidth >
                    <img
                        className="p-4 md:py-10 md:pl-10 py-5 z-[5]"
                        src="https://res.cloudinary.com/djoebsejh/image/upload/v1721138970/tytilyc36ct3ckq7xruz.svg"
                        alt="Illustration"
                    />
                </FadeIn>
                <FadeIn direction="left" delay={0.3} fullWidth >
                    <img
                        className="p-4 md:py-10 md:pr-10 py-5 z-[5]"
                        src="https://res.cloudinary.com/djoebsejh/image/upload/v1721138973/kfwbumqxvchpwiwxa2hf.svg"
                        alt="Illustration"
                    />
                </FadeIn>
            </div>


            <img
                className="absolute bottom-0 z-1 w-full"
                src="https://res.cloudinary.com/djoebsejh/image/upload/v1721132768/re68ribffzls2bjx4khn.svg"
                alt="Background End"
            />
        </div>
    );
}

export default Hero;
