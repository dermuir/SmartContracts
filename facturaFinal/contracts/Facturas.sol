pragma solidity ^0.5.0;
contract Facturas{
    mapping (address => mapping(uint => Factura)) private facturasDesplegadas;
    mapping (address => uint) private cantidadFacturas;
    address owner;

    constructor (address _owner )public {
        owner=_owner;
    }
  
    struct Factura{
        address comprador;
        bytes32 producto;    
        uint fechaCompra;
        uint costo;
        uint cantidad;
    }

    modifier onlyOwner{
        require(msg.sender==owner);
        _;
    }

    function getFactura(address _cliente,uint _numFactura) external onlyOwner view returns(bytes32 _producto,uint _fecha,uint _costo,uint _cant){
        //require(msg.sender==_cliente,"Solo el cliente puede ver sus facturas");
        require(_numFactura<= cantidadFacturas[_cliente],"No se encuentra la factura especificada");
        Factura memory fact = facturasDesplegadas[_cliente][_numFactura];
        _producto=fact.producto;
        _fecha=fact.fechaCompra;
        _costo=fact.costo;
        _cant=fact.cantidad;
    }
    function getNumFactura(address _cliente) view onlyOwner external returns(uint){
        return cantidadFacturas[_cliente];
    }

     function addNumFactura(address _cliente) private returns(uint){
        cantidadFacturas[_cliente]=cantidadFacturas[_cliente]+1;
        return cantidadFacturas[_cliente];
    }
    function addFactura(address _cliente,bytes32 _producto,uint _fecha, uint _costo,uint _cantidad) onlyOwner external{
        //require(msg.sender==owner,"Solo el dueño del negocio puede agregar sus facturas");
        uint aux = addNumFactura(_cliente);
        Factura memory factura;
        factura.comprador=_cliente;
        factura.producto=_producto;
        factura.fechaCompra=_fecha;
        factura.costo=_costo;
        factura.cantidad=_cantidad;
        facturasDesplegadas[_cliente][aux]=factura;
    }
  
}