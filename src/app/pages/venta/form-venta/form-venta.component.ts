import { startWith, map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VentaService } from './../../../service/venta.service';
import { EmpleadoService } from './../../../service/empleado.service';
import { ClienteService } from './../../../service/cliente.service';
import { TipoDocumentoService } from './../../../service/tipo-documento.service';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleVenta } from './../../../model/detalle-venta';
import { Empleado } from './../../../model/empleado';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { TipoDocumento } from './../../../model/tipo-documento';
import { Cliente } from './../../../model/cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Venta } from 'src/app/model/venta';
import { DetailsVentaComponent } from '../details-venta/details-venta.component';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form-venta.component.html',
  styleUrls: ['./form-venta.component.scss']
})
export class FormVentaComponent implements OnInit {

  tipoDocumentos: TipoDocumento[] = [];
  clientes: Cliente[] = [];
  myControlCliente: FormControl = new FormControl();
  filteredOptionsCliente: Observable<any[]>;
  clienteSeleccionado: Cliente;
  idCliente: number;

  empleados: Empleado[] = [];
  myControlEmpleado: FormControl = new FormControl();
  filteredOptionsEmpleado: Observable<any[]>;
  empleadoSeleccionado: Empleado;
  idEmpleado: number;

  displayedColumns: string[] = ['codigo', 'nombre','precio', 'cantidad', 'total', 'acciones'];

  dataProductos: MatTableDataSource<DetalleVenta>;
  ventaDetalles: DetalleVenta[] = [];


  idVenta: number;

  form: FormGroup = new FormGroup({
    tipoDocumento: new FormControl(''),
    cliente: new FormControl(''),
    empleado: new FormControl(''),
    codigo: new FormControl(''),
    fecha: new FormControl(''),
    subTotal: new FormControl(''),
    igv: new FormControl(''),
    total: new FormControl('')
  });


  constructor(private tipoDocumentoService: TipoDocumentoService,
    private clienteService: ClienteService,
    private empleadoService: EmpleadoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.idVenta = +this.route.snapshot.paramMap.get('sell');
    this.loadVenta(this.idVenta);
    this.listTipoDocumentos();
    this.listClientes();
    this.listEmpleados();
    this.dataProductos = new MatTableDataSource(this.ventaDetalles);

    this.filteredOptionsCliente = this.myControlCliente.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filterCliente(val))
      );

    this.filteredOptionsEmpleado = this.myControlEmpleado.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filterEmpleado(val))
      );
  }

  getTotalCost() {
    return this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
  }

  getIGV(){
      let total = this.dataProductos.data.reduce((summ, v) => summ += v.total, 0);
      return total*0.18;
  }

  getSubTotal(){
      return this.getTotalCost()-this.getIGV();
  }

  removeProducto(index: number, t: DetalleVenta) {
    this.ventaDetalles.splice(index, 1);
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataProductos = new MatTableDataSource(this.ventaDetalles);

  }

  listTipoDocumentos() {
    this.tipoDocumentoService.getAll()
      .subscribe(x => {
        this.tipoDocumentos = x;
      })

  }

  listClientes() {
    this.clienteService.getAll()
      .subscribe(x => {
        this.clientes = x;
      })

  }

  private filterCliente(val: any) {
    if (val != null && val.idCliente > 0) {
      return this.clientes.filter(option =>
        option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.clientes.filter(option =>
        option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnCliente(val: Cliente) {
    return val ? `${val.nombre} - ${val.dni}` : val;
  }

  seleccionarCliente(e) {
    this.clienteSeleccionado = e.option.value;
  }

  listEmpleados() {
    this.empleadoService.getAll()
      .subscribe(x => {
        this.empleados = x;
      })

  }

  private filterEmpleado(val: any) {
    if (val != null && val.idEmpleado > 0) {
      return this.empleados.filter(option =>
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()));
    } else {
      return this.empleados.filter(option =>
        option.apellidos.toLowerCase().includes(val.toLowerCase()));
    }
  }

  displayFnEmpleado(val: Empleado) {
    return val ? `${val.apellidos} ${val.nombres}` : val;
  }

  seleccionarEmpleado(e) {
    this.empleadoSeleccionado = e.option.value;
  }

  grabar() {

    let venta = new Venta();
    let tipoDocumento = new TipoDocumento();


    if (this.idVenta != 0) {
      venta.idVenta = this.idVenta;
    }
    tipoDocumento.idTipoDocumento = this.form.get('tipoDocumento').value;
    venta.tipoDocumento = tipoDocumento;
    venta.cliente = this.clienteSeleccionado;
    venta.empleado = this.empleadoSeleccionado;
    venta.codigo = this.form.get('codigo').value;
    venta.fecha = this.form.get('fecha').value;
    venta.detallesVenta = this.ventaDetalles;

    venta.subTotal = this.getSubTotal();
    venta.igv = this.getIGV();
    venta.total = this.getTotalCost();

    this.ventaService.save(venta)
    .pipe(
      catchError(error => {
        console.log('error',error);
        this.snackBar.open(error, null, {
          duration: 3000
        });
        return EMPTY;
      })
    )
      .subscribe(result => {
        this.router.navigate(['/pages/venta']);
        if (this.idVenta == 0) {
          this.snackBar.open('Venta fue registrada', 'Cerrar', {
            duration: 3000
          });
        }
        else {
          this.snackBar.open('Venta fue modificada', 'Cerrar', {
            duration: 3000
          });
        }
      });
  }

  loadVenta(id: number) {
    if (id != 0) {
      this.ventaService.getById(id)
        .subscribe(r => {
          this.form.controls['tipoDocumento'].setValue(r.tipoDocumento.idTipoDocumento);
          this.form.controls['cliente'].setValue(r.cliente.idCliente);
          this.form.controls['empleado'].setValue(r.empleado.idEmpleado);
          this.form.controls['codigo'].setValue(r.codigo);
          this.form.controls['fecha'].setValue(r.codigo);
          this.form.controls['subTotal'].setValue(r.subTotal);
          this.form.controls['igv'].setValue(r.igv);
          this.form.controls['total'].setValue(r.total);
        })

    }
  }

  cancelar() {
    this.router.navigate(['/pages/venta']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DetailsVentaComponent, {
      width: '550px',
      disableClose:true

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {

        if (!this.validResponseDialog(result)) {
          this.ventaDetalles.push(result);
          this.refreshDataSource();
        }
        else {
          this.snackBar.open('Completa los datos obligatorios del producto', 'Close', {
            duration: 5000
          });
        }
      }

    });
  }

  validResponseDialog(det: DetalleVenta): boolean {
    return (det.producto.idProducto == null || det.precio == null || det.cantidad == null
    )
  }
}

