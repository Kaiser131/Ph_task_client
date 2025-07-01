import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../shared/AnimatedTitle";
import about from "/images/about.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        });

        clipAnimation.to('.mask-clip-path', {
            width: "100vw",
            height: '100vh',
            borderRadius: 0,
        });

    });


    return (
        <div id="about" className="min-h-screen w-screen">

            <div className="relative mb-8 mt-20 flex flex-col items-center gap-5">
                <h2 className="font-general text-sm uppercase md:text-[10px] ">welcome</h2>

                <AnimatedTitle title='Unl<b>e</b>ash <br/> the F<b>u</b>tu<b>r</b>e of Esports' containerClass='mt-5 !text-black text-center' ></AnimatedTitle>

                <div className="about-subtext capitalize">
                    <p>Step into a world where milliseconds separate champions </p>
                    <p>from challengers, and every moment is a shot at immortality.</p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img src={about} alt="Background" className="absolute left-0 top-0 size-full object-cover" />
                </div>
            </div>


        </div>
    );
};

export default About;