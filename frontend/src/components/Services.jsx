import FadeIn from './FadeIn';

function Services() {
    return (
        <div className="flex flex-col items-center justify-center bg-[#05140D] w-full   md:p-10 p-5 md:py-20 py-10">
            <img className="absolute left-0 " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133537/lye4qxmyubg7wuj8exvt.svg" alt="" />
            <img className="absolute right-0 " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721133535/duitolguodf7th7fzzek.svg" alt="" />
            <FadeIn direction="up" delay={0.3} fullWidth>
                <h2 className=" md:text-5xl text-3xl text-white font-semibold text-center py-3 z-5 ">
                    Our Best Services <br /> For Your Convinience
                </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} fullWidth>
                <h3 className="md:text-xl text-sm text-white text-center py-4 z-5 md:w-[50%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quidem at labore ipsum iusto earum optio modi enim
                </h3>
            </FadeIn>

            <img className="relative py-10" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721134750/q18zkrflfd1rca0loy2f.svg" alt="" />
            <div className=" flex xl:flex-row flex-col items-center justify-center gap-[60px] py-10">
                <FadeIn direction="up" delay={0.3} fullWidth>
                    <div className="flex flex-col items-start justify-center w-[320px] bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg p-6 shadow-lg">
                        <img className="bg-[#2FB574] rounded-[50px] h-[35px] w-[35px] p-2 " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721135409/kvyqt6yrr3rotoysioou.png" alt="" />
                        <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">Guaranteed Safety</h3>
                        <h4 className="md:text-lg text-md text-white  z-5 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.Porro quidem at labore ipsum iusto earum optio modi enim
                        </h4>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.5} fullWidth>
                    <div className="flex flex-col items-start justify-center w-[320px] bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg p-6 shadow-lg">
                        <img className="bg-[#2FB574] rounded-[50px] h-[35px] w-[35px] p-2 " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721135412/hundmnkts9bfynfniadf.png" alt="" />
                        <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">All in One App</h3>
                        <h4 className="md:text-lg text-md text-white  z-5 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.Porro quidem at labore ipsum iusto earum optio modi enim
                        </h4>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.7} fullWidth>
                    <div className="flex flex-col items-start justify-center w-[320px] bg-[#2FB574] bg-opacity-10 backdrop-filter backdrop-blur-xl rounded-lg p-6 shadow-lg">
                        <img className="bg-[#2FB574] rounded-[50px] h-[35px] w-[35px] p-2 " src="https://res.cloudinary.com/djoebsejh/image/upload/v1721135411/lp1e6eqbysx1iwld4fsl.png" alt="" />
                        <h3 className="md:text-3xl text-2xl text-white font-semibold text-center py-4">Easy to Use</h3>
                        <h4 className="md:text-lg text-md text-white  z-5 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.Porro quidem at labore ipsum iusto earum optio modi enim
                        </h4>
                    </div>
                </FadeIn>


            </div>

        </div>
    )
}

export default Services