import { Button } from "./ui/button"
import FadeIn from "./FadeIn"
function Subscribe() {
  return (
    <div className="w-full mx-auto flex items-center justify-center mb-10">
      <div className="flex flex-col md:flex-row lg:w-[80%] w-[80%] bg-[#086436] rounded-[30px] z-[5] overflow-hidden relative md:py-10 lg:my-20">
        <img className="absolute top-0 left-0 w-full h-full object-cover z-[4]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721207933/p2rlnknx5frwjikomglg.svg" alt="" />
        <div className="flex flex-col items-start justify-center p-5 lg:pl-20 md:p-10 md:w-[70%] z-[5] text-left">

          <FadeIn direction="right" delay={0.5}>
            <h3 className="md:text-xl text-lg text-white text-center z-[5] ">
              Subscribe for Latest Alerts
            </h3>
          </FadeIn>

          <FadeIn direction="right" delay={0.6} >
            <h2 className="md:text-3xl text-2xl text-white font-semibold text-left py-2 z-[5]">
              New to Finvest? Subscribe to get latest Alerts
            </h2>
          </FadeIn>

        </div>
        <FadeIn direction="left" delay={0.5}className="z-[5] md:w-[40%] ">
          <div className="flex items-center justify-center p-5 lg:pr-20 z-[5]">
            <div className="flex lg:flex-row flex-col items-center justify-between z-[5] md:h-16 rounded-[30px] lg:bg-white px-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 py-3 w-[80%] rounded-[30px] px-5 mb-3 lg:m-0 focus:outline-none"
              />
              <Button variant="custom" size="lg" className="m-0  min-h-[45px] w-[80%] lg:w-auto abolute left-0">
                Subscribe
              </Button>
            </div>
          </div>
        </FadeIn>

        <img className="absolute right-0 bottom-0 w-full md:w-auto z-[3]" src="https://res.cloudinary.com/djoebsejh/image/upload/v1721207935/cjk9icycengk9xcczm05.png" alt="" />
      </div>
    </div>

  )
}

export default Subscribe
