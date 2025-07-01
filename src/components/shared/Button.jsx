import { Link } from "react-router";

const Button = ({ leftIcon, containerClass, id, rightIcon, title = 'See More', to }) => {
    return (
        <div>
            <Link to={to} id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>{leftIcon}
                <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                    <div>
                        {title}
                    </div>
                </span> {rightIcon}
            </Link >
        </div>
    );
};

export default Button;