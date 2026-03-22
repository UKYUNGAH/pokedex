import axios from 'axios';

const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

// 리스트 목록 불러오기
export const getPokeList = (limit = 151) =>
    pokeApi.get('/pokemon', { params: { limit } }).then((res) => res.data.results);

// 상세
export const getPokeDetail = (id) => pokeApi.get(`/pokemon/${id}`).then((res) => res.data);

// 한국어 이름 + 설명
export const getPokeSpecies = (id) => pokeApi.get(`/pokemon-species/${id}`).then((res) => res.data);

export const getPokeListWithDetail = async (limit = 151) => {
    const list = await getPokeList(limit);

    const details = await Promise.all(
        list.map(async (item) => {
            const detail = await getPokeDetail(item.name);
            const species = await getPokeSpecies(item.name);
            const koreanName = species.names.find((n) => n.language.name === 'ko').name;
            return { ...detail, koreanName };
        }),
    );
    return details;
};

export const getPokeDetailWithSpecies = async (id) => {
    const detail = await getPokeDetail(id);
    const species = await getPokeSpecies(id);
    const koreanName = species.names.find((n) => n.language.name === 'ko')?.name;
    const koreanDesc = species.flavor_text_entries.find((f) => f.language.name === 'ko')?.flavor_text;

    return { ...detail, koreanName, koreanDesc };
};

// 이미지
export const getOfficialArtwork = (id) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
