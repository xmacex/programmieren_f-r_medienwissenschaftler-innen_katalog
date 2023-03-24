const MAXSIZE = 100;
var hovering = false;

var explorations = function ( p ) {
    p.setup = function() {
        p.createCanvas(p.windowWidth*0.6, p.windowHeight*0.9);
        if (DEV) {console.log("p5.js katalog starting")}
        explorations = [];
        for(let i=0; i<= 1; i++) { // Wow hardcoded number what is this?
            explorations.push(new p.Exploration(i));
        }
    }

    p.draw = function() {
        p.background(p.color("#A6B1E1"));
        p.checkHovering();
        p.updateCursor();
        explorations.forEach((e, i) => {
            e.update();
            e.draw();
        });
        p.showAdviceMaybe();
    }

    p.mousePressed = function() {
        explorations.forEach(e => e.selected = false);
        explorations.forEach(e => e.clicked());
    }

    p.checkHovering = function () {
        hovering = false;
        explorations.forEach(e => {
            if ((p.mouseX > e.x - e.r - 15)
                && (p.mouseX < e.x + e.r + 15)
                && (p.mouseY > e.y - e.r - 15)
                && (p.mouseY < e.y + e.r + 15)) {
                hovering = e;
            }
        });
    }

    p.updateCursor = function() {
        if (hovering) {
            p.cursor('pointer')
        } else {
            p.cursor();
        }
    }

    p.showAdviceMaybe = function() {
        if (hovering) {
            p.textSize(15)
            let advice = '💬 „' + data[hovering.i].advice + '”'
            p.text(advice, p.mouseX+10, p.mouseY+10, 200);
        }
    }

    p.Exploration = function(i) {
        this.i = i;
        this.r = p.random(0, 5);
        this.x = p.random(this.r * 2, p.width - (this.r * 2));
        this.y = p.random(this.r * 2, p.height - (this.r * 2));

        this.selected = false;

        this.clicked = function() {
            var d = p.dist(p.mouseX, p.mouseY, this.x, this.y);
            if (d < 15) {
                this.selected = true;
                if (DEV) {console.log("Selected " + this.i);}
                show_details(this.i);
            }
        }

        this.update = function() {
            this.resize();
            this.move();
        }

        this.resize = function() {
            this.r = (this.r + (p.frameCount % 100 / 100)) % MAXSIZE;
        }

        this.move = function() {
            if (this.x > (this.r * 2) && this.x < p.width-(this.r * 2)) {
                this.x = this.x + p.random(-1, 1);
            }
            if (this.y > (this.r * 2) && this.y < p.height-(this.r * 2)) {
                this.y = this.y + p.random(-1, 1);
            }
        }

        this.draw = function() {
            p.noStroke();
            if (this.selected) {
                p.fill("#25316D");
            } else {
                p.fill("#DCD6F7");
            }
            p.circle(this.x, this.y, this.r + 20);

            if (this.selected) {
                p.fill("#DCD6F7");
            } else {
                p.fill("#25316D");
            }
            if (DEV){
                p.textAlign(p.CENTER, p.CENTER);
                p.text(this.i, this.x, this.y);
            }
        }
    }
}

var explorations = new p5(explorations, "explorations")
