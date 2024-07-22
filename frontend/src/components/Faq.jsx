import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "./FadeIn";

function Faq() {

    return (
        <div className="flex flex-col items-center justify-center w-full z-[5] py-10 lg:py-20">
            <FadeIn direction="up" delay={0.3} fullWidth>
                <h2 className="md:text-5xl text-3xl text-white font-semibold text-center py-3 z-5">
                    Frequently Asked Questions
                </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.4} fullWidth>
                <img
                    className="relative py-10"
                    src="https://res.cloudinary.com/djoebsejh/image/upload/v1721134750/q18zkrflfd1rca0loy2f.svg"
                    alt="FAQ Decoration"
                />
            </FadeIn>

            <FadeIn direction="up" delay={0.5} fullWidth>
                <div className="w-full max-w-4xl p-4 z-[5]">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-b border-gray-400">
                            <AccordionTrigger className="text-lg md:text-xl py-4 px-6 text-white">
                                Is it accessible?
                            </AccordionTrigger>
                            <AccordionContent className="text-base p-6 text-white">
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b border-gray-400">
                            <AccordionTrigger className="text-lg md:text-xl py-4 px-6 text-white">
                                Is it styled?
                            </AccordionTrigger>
                            <AccordionContent className="text-base p-6 text-white">
                                Yes. It comes with default styles that match the other components'
                                aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg md:text-xl py-4 px-6 border-0 text-white hover:no-underline">
                                Is it animated?
                            </AccordionTrigger>
                            <AccordionContent className="text-base p-6 text-white border-none">
                                Yes. It's animated by default, but you can disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </FadeIn>

        </div>
    );
}

export default Faq;
