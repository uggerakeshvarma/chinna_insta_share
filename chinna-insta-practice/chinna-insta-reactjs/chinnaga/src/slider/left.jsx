
function ArrowRight(props) {
    const { className, style, onClick } = props;

    return (
        <div className={className}
            style={{ ...style, color: "black", fontSize: "1.5rem", position: "absolute", zIndex: 1, width: 'none' }}
            onClick={onClick}>
            <CaretRightFill></CaretRightFill>
        </div>
    )
};
