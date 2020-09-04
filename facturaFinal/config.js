module.exports = {
    PORT: 3000,
    ethereum:{
        contractAddress: '0x7D9189F678Ea74d487666119ceD83baE6bcE3d77', 
        abi: [{"inputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"constant":true,"inputs":[{"name":"_cliente","type":"address"},{"name":"_numFactura","type":"uint256"}],"name":"getFactura","outputs":[{"name":"_producto","type":"bytes32"},{"name":"_fecha","type":"uint256"},{"name":"_costo","type":"uint256"},{"name":"_cant","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x00268940"},{"constant":true,"inputs":[{"name":"_cliente","type":"address"}],"name":"getNumFactura","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x411fe84d"},{"constant":false,"inputs":[{"name":"_cliente","type":"address"},{"name":"_producto","type":"bytes32"},{"name":"_fecha","type":"uint256"},{"name":"_costo","type":"uint256"},{"name":"_cantidad","type":"uint256"}],"name":"addFactura","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xc659a9eb"}],
        privateKey: 'bbe1681138e2ae3e570ebba8535f1b0946c4db3bc97e6e38bd4e5af604fca965',
    }
}