import { getPokeListWithDetail } from '@/shared/api/pokemon';
import { useQuery } from '@tanstack/react-query';

export const usePokeList = () => {
    const query = useQuery({
        queryKey: ['pokeList'],
        queryFn: () => getPokeListWithDetail(151),
    });

    return {
        pokemons: query.data,
        isPending: query.isPending,
        isError: query.isError,
    };
};
