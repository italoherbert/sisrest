import { PedidoItem } from "./PedidoItem";

export interface Pedido {
    id : number;
    mesa : number;
    items : PedidoItem[];
}

export interface SavePedido {
    mesa : number;
    cardapioItems: number[];
}