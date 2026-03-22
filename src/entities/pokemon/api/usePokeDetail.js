import { getPokeDetail } from '@/shared/api/pokemon';
import { useQuery } from '@tanstack/react-query';

export const usePokeDetail = (id) => {
    const query = useQuery({
        queryKey: ['pokeDetail', id],
        queryFn: () => getPokeDetail(id),
        enabled: !!id,
    });

    return {
        pokeDetail: query.data,
        isPending: query.isPending,
        isError: query.isError,
    };
};
