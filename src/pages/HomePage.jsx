import { usePokeList } from '@/entities/pokemon/api/usePokeList';
import { getOfficialArtwork } from '@/shared/api/pokemon';
import { Link } from 'react-router-dom';
import { typeKorean } from '../shared/utils/typeKorean';

function HomePage() {
    const { pokemons, isPending, isError } = usePokeList();

    console.log('리스트:', pokemons);

    if (isPending) return <p>로딩중</p>;
    if (isError) return <p>에러</p>;

    return (
        <>
            {pokemons.map((item) => {
                return (
                    <Link key={item.name} to={`/pokemon/${item.id}`}>
                        <img src={getOfficialArtwork(item.id)} alt={item.koreanName || item.name} />
                        <p>{item.name}</p>
                        <p>{item.koreanName}</p>
                        <p>
                            {item.types.map((t) => (
                                <span key={t.type.name} className="mr-2">
                                    {typeKorean[t.type.name]}
                                </span>
                            ))}
                        </p>
                    </Link>
                );
            })}
        </>
    );
}

export default HomePage;
