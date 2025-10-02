/**
 * Modelo de respuesta de la PokeAPI
 */
export interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

export interface PokemonDetailResponse {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}
