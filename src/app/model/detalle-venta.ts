import { Producto } from './producto';
import { Venta } from './venta';
export class DetalleVenta{
    idDetalleVenta: number;
    venta: Venta;
    producto: Producto;
    cantidad: number;
    precio: number;
    total: number;
}