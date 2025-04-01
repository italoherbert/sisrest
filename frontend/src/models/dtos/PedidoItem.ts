import { CardapioItem } from "./CardapioItem";

export interface PedidoItem {
    id: number;
    quantidade: number;
    cardapioItem: CardapioItem;
}

export interface SavePedidoItem {
    cardapioItemId: number;
    quantidade: number;
}