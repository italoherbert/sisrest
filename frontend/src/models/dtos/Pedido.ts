import { PedidoItem, SavePedidoItem } from "./PedidoItem";

export interface Pedido {
    id : number;
    mesa : number;
    items : PedidoItem[];
}

export interface SavePedido {
    mesa : number;
    items: SavePedidoItem[];
}