import { usePokeList } from '@/entities/pokemon/api/usePokeList';
import { getOfficialArtwork } from '@/shared/api/pokemon';
import { Link } from 'react-router-dom';
import { typeKorean, typeColors } from '@/shared/utils/typeKorean';
import { formatId } from '../shared/utils/formatPokemon';
import { Trees, Search } from 'lucide-react';
import HomeLoading from '@/shared/ui/HomeLoading';
import { useState } from 'react';

function HomePage() {
    const { pokemons, isPending, isError } = usePokeList();
    const [query, setQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const filtered = pokemons?.filter((item) => {
        const matchName = item.koreanName?.includes(query) || item.name.includes(query);
        const matchType = selectedType === '' || item.types.some((t) => t.type.name === selectedType);
        return matchName && matchType;
    });

    if (isError) return <ErrorMessage />;

    return (
        <>
            {/* 타이틀 영역 */}
            <div class="bg-linear-to-b from-[#A8D5E2] to-[#D4F5FF] pt-8 pb-6 px-5 relative overflow-hidden">
                <div>
                    <div className="absolute top-4 left-8 w-16 h-8 bg-white/60 rounded-full blur-sm"></div>
                    <div className="absolute top-6 right-12 w-20 h-10 bg-white/60 rounded-full  blur-md"></div>
                    <div className="absolute top-12 left-24 w-20 h-10 bg-white/60 rounded-full  blur-md"></div>
                    <h1 className="text-2xl font-bold mb-5 text-[#5A8A9A] relative z-10 flex items-center justify-center gap-1">
                        <Trees className="size-8 " />
                        <span>포켓몬 도감</span>
                    </h1>
                </div>

                {/* 검색 영역 */}
                <div className="w-full pl-5 pr-4 py-3 rounded-full bg-white/90 shadow-sm text-sm flex gap-2">
                    <Search className="text-[#8AB5C2]" size={18} />
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="검색어를 입력해주세요."
                        className="placeholder:text-[#A8C5D1] w-full focus:outline-none  "
                    />
                </div>
            </div>

            {/* 필터 영역 */}
            <div className="px-4 py-4 flex flex-wrap gap-2 bg-white/40">
                <button
                    onClick={() => setSelectedType('')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedType === '' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    전체
                </button>
                {Object.entries(typeKorean).map(([en, ko]) => (
                    <button
                        key={en}
                        onClick={() => setSelectedType(en)}
                        style={{ background: typeColors[en] }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all text-gray-600"
                    >
                        {ko}
                    </button>
                ))}
            </div>

            {/* 목록 영역 */}
            <div className="p-4">
                <p className="text-xs text-[#8AB5C2] mb-3 font-medium">{filtered?.length || '151'}마리</p>

                {isPending ? (
                    <HomeLoading />
                ) : (
                    <>
                        {/* 목록 */}
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <img
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
                                    alt="고라파덕"
                                    className="w-24 h-24 object-contain mb-3"
                                />
                                <p className="text-sm text-gray-400">'{query}' 검색 결과가 없어요</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 ">
                                {filtered.map((item) => {
                                    return (
                                        <Link
                                            key={item.name}
                                            to={`/pokemon/${item.id}`}
                                            className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                                        >
                                            {/* 이미지 영역 */}
                                            <div className="bg-[#F5F5F5] p-4 flex justify-center items-center rounded-t-2xl relative">
                                                <p className="absolute top-2 right-2 text-[10px] font-bold text-gray-400">
                                                    {formatId(item.id)}
                                                </p>
                                                <div className="flex justify-center items-center h-28">
                                                    <img
                                                        src={getOfficialArtwork(item.id)}
                                                        alt={item.koreanName || item.name}
                                                        className="w-24 h-24 object-contain drop-shadow-md"
                                                    />
                                                </div>
                                            </div>
                                            {/* 정보 영역 */}
                                            <div className="p-3">
                                                <p className="font-bold text-sm text-gray-800 mb-0.5">
                                                    {item.koreanName}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mb-2">{item.name}</p>
                                                <div className="flex gap-1 text-[#5a5a5a]">
                                                    {item.types.map((t) => (
                                                        <span
                                                            key={t.type.name}
                                                            style={{ background: typeColors[t.type.name] }}
                                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                                                        >
                                                            {typeKorean[t.type.name]}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default HomePage;
