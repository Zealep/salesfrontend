import { Empleado } from './empleado';
import { Cliente } from './cliente';
import { TipoDocumento } from './tipo-documento';
export class Venta{
    
    idVenta: number;
    tipoDocumento: TipoDocumento;
    cliente: Cliente;
    empleado: Empleado;
    codigo: string;
    fecha: Date;
    subTotal: number;
    descuento: number;
    igv: number;
    total: number;

}