module.exports = {
    PORT: 3000,
    ethereum:{
        contractAddress: '0xE4724D77812670a777e83b772a2C4c070a25A5F8', 
        abi: [{"inputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"getPrueba","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_cliente","type":"address"},{"name":"_numFactura","type":"uint256"}],"name":"getFactura","outputs":[{"name":"_producto","type":"bytes32"},{"name":"_fecha","type":"uint256"},{"name":"_costo","type":"uint256"},{"name":"_cant","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_cliente","type":"address"}],"name":"getNumFactura","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cliente","type":"address"},{"name":"_producto","type":"bytes32"},{"name":"_fecha","type":"uint256"},{"name":"_costo","type":"uint256"},{"name":"_cantidad","type":"uint256"}],"name":"addFactura","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
        privateKey: 'bbe1681138e2ae3e570ebba8535f1b0946c4db3bc97e6e38bd4e5af604fca965',
    }
}