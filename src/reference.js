
function calcPN(pi) {
    // Pn = (Pi * 10) mod 97
    return (pi * 10) % 97
}

function checkDigit(pn) {
    // Check digit = 98 – Pn
    const checkDigit = 98 - pn
    return checkDigit < 10 ? `0${checkDigit}` : checkDigit
}

function referenceGeneretor(req, res) {
    console.log(req.body)
    // const entidade = "54321"
    const entidade = String(req.body.entidade)
    const numeroFactura = String(req.body.numero_factura)
    let nowMonth = new Date().getMonth() + 1
    const mes = nowMonth.toString().length == 1 ? `0${nowMonth.toString()}` : nowMonth.toString()
    const montante = req.body.valor
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
    const pn = calcPN(pi)
    const cd = checkDigit(pn)
    //Referência = Número factura + Mês + Check digit
    const referencia = numeroFactura + mes + cd
    const dadosBank = {
        "Mes": mes,
        "Fatura": numeroFactura,
        "Entidade": entidade,
        "Montante": montante,
        "Referencia": referencia
    }
    res.json({ si: si, pi: pi, pn: pn, cd: cd, referencia: referencia, dadosBank: dadosBank })
}

module.exports = {
    referenceGeneretor
}
