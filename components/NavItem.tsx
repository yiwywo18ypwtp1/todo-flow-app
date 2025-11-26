const NavItem = () => {
    return (
        <div className="flex items-center justify-between" >
            <div className="w-full flex items-center justify-start gap-3 p-1 hover:bg-white/5 rounded-lg cursor-pointer transition-all">
                <Image
                    src="/svg/home.svg"
                    alt="home"
                    width={25}
                    height={25}
                />


                {expand && <h1>Home</h1>}
            </div>
        </div>
    );
}

export default NavItem;