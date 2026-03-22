import { usePokeList } from '@/entities/pokemon/api/usePokeList';
import { getOfficialArtwork } from '@/shared/api/pokemon';
import { Link } from 'react-router-dom';
import { typeKorean, typeColors } from '@/shared/utils/typeKorean';
import { formatId } from '../shared/utils/formatPokemon';
import { Trees } from 'lucide-react';
import HomeLoading from '@/shared/ui/HomeLoading';

function HomePage() {
    const { pokemons, isPending, isError } = usePokeList();

    console.log('리스트:', pokemons);

    if (isError) return <ErrorMessage />;

    return (
        <>
            <div class="bg-linear-to-b from-[#A8D5E2] to-[#D4F5FF] pt-8 pb-6 px-5 relative overflow-hidden">
                <div className="absolute top-4 left-8 w-16 h-8 bg-white/60 rounded-full blur-sm"></div>
                <div className="absolute top-6 right-12 w-20 h-10 bg-white/60 rounded-full  blur-md"></div>
                <div className="absolute top-12 left-24 w-20 h-10 bg-white/60 rounded-full  blur-md"></div>
                <h1 className="text-2xl font-bold mb-5 text-[#5A8A9A] relative z-10 flex items-center justify-center gap-1">
                    <Trees className="size-8 " />
                    <span>포켓몬 도감</span>
                </h1>
            </div>
            <div className="p-4">
                <p className="text-xs text-[#8AB5C2] mb-3 font-medium">{pokemons?.length || '151'}마리</p>

                {isPending ? (
                    <HomeLoading />
                ) : (
                    <>
                        {/* 목록 */}
                        <div className="grid grid-cols-2 gap-3 ">
                            {pokemons.map((item) => {
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
                                            <p className="font-bold text-sm text-gray-800 mb-0.5">{item.koreanName}</p>
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
                    </>
                )}
            </div>
        </>
    );
}

export default HomePage;
