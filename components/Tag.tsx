type TagProps = {
    title: string;
    color: string;
}

const Tag = ({ title, color }: TagProps) => {
    return (
        <span
            style={{
                backgroundColor: color + "20",
                borderColor: color,
                color: color,
            }}
            className="text-xs px-2 py-0.5 rounded-full border"
        >
            {title}
        </span>
    );
}

export default Tag;