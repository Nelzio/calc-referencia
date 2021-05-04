
function calcSIandPN(pi) {
    // Pn = (Pi * 10) mod 97
    return (pi * 10) % 97
}

function checkDigit(pn) {
    // Check digit = 98 – Pn
    const checkDigit = 98 - pn
    return checkDigit < 10 ? `0${checkDigit}` : checkDigit
}

function referenceGeneretor(req, res) {
    const entidade = "54321"
    const numeroFactura = "1212245"
    const mes = new Date().getMonth()
    const montante = "200000"
    const EntidadeReferenciaMesMontante = entidade + numeroFactura + mes + montante
    si = 0
    pi = 0
    const entidadeReferencia = EntidadeReferenciaMesMontante
    for (let index = 0; index < entidadeReferencia.length; index++) {
        // calc si and pi
        const element = entidadeReferencia[index];
        si = parseInt(element) + pi // Si = digito(i) + Pi
        pi = (si * 10) % 97 // Pi = (Si * 10) mod 97
    }
    const pn = calcSIandPN(pi)
    const cd = checkDigit(pn)
    //Referência = Número factura + Mês + Check digit
    const referencia = numeroFactura + mes + cd
    res.json({ si: si, pi: pi, pn: pn, cd: cd, referencia: referencia })
}

module.exports = {
    referenceGeneretor
}
