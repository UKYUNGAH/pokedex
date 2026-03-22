// 포켓몬 번호 3자리로 표시 (1 → #001)
export const formatId = (id) => `#${String(id).padStart(3, '0')}`;
