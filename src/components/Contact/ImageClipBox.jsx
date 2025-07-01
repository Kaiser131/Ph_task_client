
const ImageClipBox = ({ src, clipClass }) => {
    return (
        <div className={clipClass}>
            <img src={src} alt="" />
        </div >
    );
};

export default ImageClipBox;