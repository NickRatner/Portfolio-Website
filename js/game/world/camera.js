export function createCamera() {

    return {

        x: 0,
        y: 0,

        update(player) {

            const canvas =
                document.getElementById("game-canvas");

            this.x =
                player.x -
                canvas.width / 2;

            this.y =
                player.y -
                canvas.height / 2;


            // Don't show outside world
            this.x = Math.max(0, this.x);
            this.y = Math.max(0, this.y);


            this.x = Math.min(
                2000 - canvas.width,
                this.x
            );

            this.y = Math.min(
                1200 - canvas.height,
                this.y
            );
        },


        apply(context) {

            context.translate(
                -this.x,
                -this.y
            );
        }
    };
}