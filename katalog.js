var explorations = function ( p ) {
    p.setup = function() {
        p.createCanvas(p.windowWidth*0.6, p.windowHeight);
        console.log("p5.js starting")
        explorations = [];
        for(let i=0; i<= 3; i++) {
            explorations.push(new p.Exploration(i,
                                                p.random(30, p.width-30),
                                                p.random(30, p.height-30)));
        }
    }

    p.draw = function() {
        p.background(p.color("#DCD6F7"))
        explorations.forEach((e, i) => {
            e.update();
            e.draw();
        });
    }

    p.mousePressed = function() {
        explorations.forEach(e => e.selected = false);
        explorations.forEach(e => e.clicked());
    }

    p.Exploration = function(i, x, y) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.r = p.random(0, 5);
        this.selected = false;

        this.clicked = function() {
            var d = p.dist(p.mouseX, p.mouseY, this.x, this.y);
            if (d < 15) {
                this.selected = true;
                console.log("Selected " + this.i)
                show_details(this.i);
            }
        }

        this.update = function() {
            this.resize();
            this.move();
        }

        this.resize = function() {
            this.r = (this.r + (p.frameCount % 100 / 300)) % 25;
        }

        this.move = function() {
            if (this.x > this.r && this.x < p.width-this.r) {
                this.x = this.x + p.random(-1, 1);
            }
            if (this.y > this.r && this.y < p.height-this.r) {
                this.y = this.y + p.random(-1, 1);
            }
        }

        this.draw = function() {
            p.noStroke();
            if (this.selected) {
                p.fill("red");
            } else {
                p.fill("white");
            }
            p.circle(this.x, this.y, this.r + 20);
            p.fill("black");
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.i, this.x, this.y);
        }
    }
}

var explorations = new p5(explorations, "explorations")
