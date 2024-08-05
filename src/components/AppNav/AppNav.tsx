export default function AppNav({ children }: { children: React.ReactNode }) {
    return (
        <nav className="col-start-1 row-start-2 flex gap-4 items-center justify-center bg-primary lg:flex-col lg:fixed lg:h-full lg:w-[7%]">
            {children}
        </nav>
    );
}
