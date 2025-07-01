import Button from "../shared/Button";
import ImageClipBox from "./ImageClipBox";

import contact_1 from '/images/contact-1.webp';
import contact_2 from '/images/contact-2.webp';
import swordman from '/images/swordman.webp';
import swordmanPartial from '/images/swordman-partial.webp';
const Contact = () => {
    return (
        <div id="contact" className="my-20 min-h-96 w-screen px-10">


            <div className="relative rounded-lg bg-black py-20 text-blue-50 sm:overflow-hidden ">

                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96 ">
                    <ImageClipBox clipClass='contact-clip-path-1' src={contact_1} ></ImageClipBox>
                    <ImageClipBox clipClass='contact-clip-path-2 lg:translate-y-40 translate-y-60 ' src={contact_2} ></ImageClipBox>
                </div>

                <div className="absolute -top-40 left-20  w-60 items-center sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 ">
                    <ImageClipBox clipClass='absolute md:scale-125 ' src={swordmanPartial} ></ImageClipBox>
                    <ImageClipBox clipClass='sword-man-clip-path md:scale-125 ' src={swordman} ></ImageClipBox>
                </div>

                <div className="flex flex-col items-center text-center space-y-5 py-20">
                    <p className="font-general uppercase text-[10px].">
                        Join Arcane
                    </p>
                    <p className=" special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] z-10 ">Lets m<b>a</b>k<b>e</b> <br /> the big adventure <b>o</b>f <br /> Arc<b>a</b>ne </p>

                    <Button title="Contact Us" containerClass=' cursor-pointer' ></Button>

                </div>


            </div>


        </div>
    );
};

export default Contact;