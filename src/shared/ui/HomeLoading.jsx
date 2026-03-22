export default function HomeLoading() {
    return (
        <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="bg-gray-100 h-[144px] animate-pulse" />
                    <div className="h-[88px] p-3">
                        <div className="bg-gray-100 h-4 w-16 rounded mb-2 animate-pulse" />
                        <div className="bg-gray-100 h-3 w-12 rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}
