
export interface CardapioItem {
    id : number;
    descricao : string;
    preco: number;
}

export type SaveCardapioItem = Partial<CardapioItem>;