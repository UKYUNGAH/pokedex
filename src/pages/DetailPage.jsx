import { usePokeDetail } from '@/entities/pokemon/api/usePokeDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formatId } from '../shared/utils/formatPokemon';
import { getOfficialArtwork } from '@/shared/api/pokemon';
import { typeKorean, typeColors, statKorean, statColors } from '@/shared/utils/typeKorean';
import DetailLoading from '@/shared/ui/DetailLoading';
import ErrorMessage from '@/shared/ui/ErrorMessage';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { pokeDetail, isPending, isError } = usePokeDetail(id);

    console.log(pokeDetail);
    if (isPending) return <DetailLoading />;
    if (isError) return <ErrorMessage />;
    return (
        <>
            <div className="w-full max-w-[375px] bg-white/40 shadow-2xl min-h-screen pb-8">
                {/* 뒤로가기 버튼 */}
                <div className="bg-linear-to-b from-[#A8D5E2] to-[#D4F5FF] p-4 relative overflow-hidden ">
                    <div className="absolute w-20 h-7 bg-white top-3 left-10 rounded-2xl blur-md"></div>
                    <div className="absolute w-18 h-5 bg-white top-10 right-6 rounded-2xl blur-md"></div>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-[#5A8A9A] hover:text-[#4A7A8A] transition-colors font-semibold text-sm relative z-10 cursor-pointer"
                    >
                        <ArrowLeft className="size-5" />
                        돌아가기
                    </button>
                </div>

                {/* 정보 영역 */}
                <div className="bg-white/80 mx-4 mt-4 rounded-3xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-br from-[#F5F5F5] to-[#FAFAFA] p-8 relative">
                        <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                            <p className="text-xs font-bold text-gray-500">{formatId(pokeDetail.id)}</p>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={getOfficialArtwork(pokeDetail.id)}
                                alt={pokeDetail.koreanName}
                                className="w-48 h-48 object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="text-center mb-6">
                            <p className="text-3xl font-bold text-gray-800 mb-1">{pokeDetail.koreanName}</p>
                            <p className="text-sm text-gray-500">{pokeDetail.name}</p>
                        </div>
                        <div className="flex gap-2 justify-center mb-6">
                            {pokeDetail.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    style={{ background: typeColors[t.type.name] }}
                                    className="px-5 py-2 rounded-full text-sm font-semibold shadow-sm text-[#5A5A5A]"
                                >
                                    {typeKorean[t.type.name]}
                                </span>
                            ))}
                        </div>
                        <div className="bg-white/80 rounded-2xl p-5 mb-6 shadow-sm">
                            <p className="text-gray-700 text-sm leading-relaxed break-keep">{pokeDetail.koreanDesc}</p>
                        </div>

                        <div className="bg-white/80 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-base font-bold text-gray-800 mb-4">능력치</h3>
                            <div>
                                {pokeDetail.stats.map((s) => (
                                    <div key={s.stat.name} className="mb-3 last:mb-0">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold text-gray-700">
                                                {statKorean[s.stat.name]}
                                            </span>
                                            <span className="text-sm font-bold text-gray-800">{s.base_stat}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                                            <div
                                                className="h-2.5 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${(s.base_stat / 255) * 100}%`,
                                                    backgroundColor: statColors[s.stat.name],
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
