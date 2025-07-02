class Parquimetro {
    constructor() {
        this.minutosPorReal = 30;
        this.tempoRestante = 0;
        this.tempoMaximo = 120; 
    }

    calcularTempo(valor) {
        return valor * this.minutosPorReal;
    }

    inserirValor(valor) {
        const minutosInseridos = this.calcularTempo(valor);

        if (this.tempoRestante + minutosInseridos > this.tempoMaximo) {
            const minutosPermitidos = this.tempoMaximo - this.tempoRestante;
            const minutosExcedentes = minutosInseridos - minutosPermitidos;
            const troco = minutosExcedentes / this.minutosPorReal;

            this.tempoRestante = this.tempoMaximo; 
            console.log(`Tempo máximo atingido. Devolvendo R$${troco.toFixed(2)} de troco.`);
            alert(`Tempo máximo atingido (${this.tempoMaximo} minutos)! Devolvendo R$${troco.toFixed(2)} de troco.`);
        } else {
            this.tempoRestante += minutosInseridos; 
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