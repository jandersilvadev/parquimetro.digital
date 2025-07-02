class Parquimetro {
    constructor() {
        this.tempoRestante = 0;
        this.tempoMaximo = 120;
    }

    calcularTempo(valor) {
        if (valor >= 3.00) {
            return { minutos: 120, troco: valor - 3.00 }; 
        } else if (valor >= 1.75) {
            return { minutos: 60, troco: valor - 1.75 };
        } else if (valor >= 1.00) {
            return { minutos: 30, troco: valor - 1.00 };
        } else {
            return { minutos: 0, troco: valor, mensagem: "Valor insuficiente" };
        }
    }

    inserirValor(valor) {
        const resultado = this.calcularTempo(valor);

        if (resultado.minutos === 0) {
            alert("Valor insuficiente. O valor mínimo é R$1,00.");
            return;
        }

        const minutosDisponiveis = this.tempoMaximo - this.tempoRestante;

        if (resultado.minutos > minutosDisponiveis) {
            const minutosPermitidos = minutosDisponiveis;
            this.tempoRestante = this.tempoMaximo;

            const proporcao = minutosPermitidos / resultado.minutos;
            const valorUtilizado = (valor - resultado.troco) * proporcao;
            const trocoFinal = valor - valorUtilizado;

            alert(`Tempo máximo atingido (${this.tempoMaximo} minutos)! Devolvendo R$${trocoFinal.toFixed(2)} de troco.`);
        } else {
            this.tempoRestante += resultado.minutos;

            if (resultado.troco > 0) {
                alert(`Adicionado ${resultado.minutos} minutos. Devolvendo R$${resultado.troco.toFixed(2)} de troco.`);
            }
        }

        this.mostrarTempoDisponivel();
    }

    mostrarTempoDisponivel() {
        const resultadoElement = document.getElementById("resultado");
        if (resultadoElement) {
            resultadoElement.innerText = `Tempo disponível: ${this.tempoRestante.toFixed(0)} minutos (Máx: ${this.tempoMaximo} minutos)`;
        }
    }
}

const parquimetro = new Parquimetro();

const valorInput = document.getElementById("valorInput");
const inserirBtn = document.getElementById("inserirBtn");

if (inserirBtn && valorInput) {
    inserirBtn.addEventListener("click", () => {
        const valor = parseFloat(valorInput.value);
        if (!isNaN(valor) && valor > 0) {
            parquimetro.inserirValor(valor);
        } else {
            alert("Por favor, insira um valor válido e positivo.");
        }
        valorInput.value = "";
    });
}

parquimetro.mostrarTempoDisponivel();