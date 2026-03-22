export default function ErrorMessage({ message = '포켓몬을 불러오지 못했어요.' }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6 min-h-screen">
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
                alt="고라파덕"
                className="w-32 h-32 object-contain mb-4"
            />
            <p className="text-gray-700 font-bold text-base mb-1">앗, 문제가 생겼어요!</p>
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}
