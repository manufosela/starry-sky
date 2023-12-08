import { html, css, LitElement } from 'lit';

export class StarrySky extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  `;

  static properties = {
    starsNum: { type: Number, attribute: 'stars-num' },
  };

  constructor() {
    super();

    this.starsNum = 2000;
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    this.drawStars();
  }


  resizeCanvas() {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.drawStars();
  }

  drawStars() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    for (let starsCounter = 0; starsCounter < this.starsNum; starsCounter += 1) {
      this.drawStar(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        Math.random() * 1.5, // Tamaño de la estrella
        'white',
        Math.random() > 0.5 // Para difuminar algunas estrellas
      );
    }
  }

  drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, 'black');
    // Franja central simulando la Vía Láctea
    gradient.addColorStop(0.5, 'rgba(0, 0, 50, 0.7)');
    gradient.addColorStop(1, 'black');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawStar(x, y, radius, color, isBlur) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = color;
    if (isBlur) {
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = radius * 5;
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  render() {
    return html`
      <canvas id="starCanvas"></canvas>
    `;
  }
}
