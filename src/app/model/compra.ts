import { DetalleCompra } from './detalle-compra';
import { Empleado } from './empleado';
import { Proveedor } from './proveedor';
import { TipoDocumento } from './tipo-documento';
export class Compra{

    idCompra: number;
    tipoDocumento: TipoDocumento;
    proveedor: Proveedor;
    empleado: Empleado;
    detallesCompra: DetalleCompra[];
    codigo: string;
    fecha: Date;
    subTotal: number;
    igv: number;
    total: number;

}
