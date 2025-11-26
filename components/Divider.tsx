const Divider = ({ vertical: vertical = false }: { vertical?: boolean }) => {
    return <div className={`bg-white/5 ${vertical ? "h-full min-w-px" : "w-full min-h-px"}`}></div>
}

export default Divider;