class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.MaxReverseSpeed = -3;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    this.#move();
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }

    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < this.MaxReverseSpeed) {
      this.speed = this.MaxReverseSpeed;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(pen) {
    pen.save();
    pen.translate(this.x, this.y);
    pen.rotate(-this.angle);
    pen.beginPath();
    pen.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    pen.fill();
    pen.restore();
  }
}
