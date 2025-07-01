import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";




const Features = () => {
    return (
        <section className="bg-black pb-20">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32 ">
                    <p className="font-circuler-web text-lg text-blue-50 ">Into the metagame layer</p>
                    <p className="max-w-md font-circuler-web text-lg text-blue-50 opacity-50 ">immerse your self in a rich  and ever expanding universe where a vibrant array of products coverage into an inter connected overlay expercied world</p>
                </div>
                {/* bento grid */}
                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh] ">

                    <BentoCard src='videos/feature-1.mp4' title={<>radia<b>n</b>t</>} description='Immerse yourself in an IP-rich product universe where AI-driven gamification and hyper-personalization lead humans & AI into a global play economy.' />

                </BentoTilt>

                {/* lower cards */}
                <div className="grid grid-cols-2 grid-rows-3 gap-7 h-[135vh]">

                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 ">
                        <BentoCard src="videos/feature-2.mp4" title={<>zig<b>m</b>a </>} description='An anime and gaming-inspired NFT collection - the IP primed for expansion.' />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 ">
                        <BentoCard src='videos/feature-3.mp4' title={<>n<b>e</b>xus</>} description='A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.' />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 ">
                        <BentoCard src='videos/feature-4.mp4' title={<>az<b>u</b>l</>} description='A cross-world AI Agent - elevating your gameplay to be more fun and productive.' />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt-2">
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">M<b>o</b>re C<b>o</b>ming Soon</h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end "></TiLocationArrow>
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video src="/videos/feature-5.mp4" loop muted autoPlay className="size-full object-cover object-center" />
                    </BentoTilt>


                </div>

            </div>

        </section>
    );
};

export default Features;