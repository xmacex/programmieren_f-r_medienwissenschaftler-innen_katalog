var explorations = function ( p ) {
    p.setup = function() {
        p.createCanvas(400, 400);
        console.log("p5.js starting")
        explorations = [];
        for(let i=0; i<= 3; i++) {
            // explorations.push(new p.Exploration(i, 50+i*40, 100+i*30));
            explorations.push(new p.Exploration(i, p.random(15, p.width-15), p.random(15, p.height-15)));
        }
    }

    p.draw = function() {
        // p.background(230);
        p.background(p.color("#DCD6F7"))
        explorations.forEach((e, i) => {
            e.move();
            e.draw();
        });
    }

    p.mousePressed = function() {
        explorations.forEach(e => e.fill = "white");
        explorations.forEach(e => e.clicked());
    }

    p.Exploration = function(i, x, y) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.fill = "white";

        this.clicked = function() {
            var d = p.dist(p.mouseX, p.mouseY, this.x, this.y);
            if (d < 30/2) {
                console.log("klik");
                this.fill = "red";
                show_details(this.i);
            }
        }

        this.move = function() {
            if (this.x > 15 && this.x < p.width-15) {
                this.x = this.x + p.random(-1, 1);
            }
            if (this.y > 15 && this.y < p.height-15) {
                this.y = this.y + p.random(-1, 1);
            }
        }

        this.draw = function() {
            p.fill(this.fill);
            p.circle(this.x, this.y, 30);
            p.fill("black");
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.i, this.x, this.y);
        }
    }
}

var explorations = new p5(explorations, "explorations")
