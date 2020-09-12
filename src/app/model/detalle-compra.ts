import { Producto } from './producto';
import { Compra } from './compra';
export class DetalleCompra{
    idDetalleCompra: number;
    compra: Compra;
    producto: Producto;
    cantidad: number;
    precioCompra: number;
    precioVenta: number;
    total: number;
}