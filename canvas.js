new Vue({
  el: "#app",
  data: {
    title: "My Canvas Practice",
  },
  mounted() {
    const canvas = document.getElementById('myCanvas');
    canvas.width = 500;
    canvas.height = 1000;
    const blockSize = 50;
    const fieldCol = 10;
    const fieldRow = 20;
    const tetroSize = 4;
		let tetroX = 0;
		let tetroY = 0;
    const screenW = fieldCol * blockSize;
    const screenH = fieldRow * blockSize;
    const ctx = canvas.getContext('2d');
    canvas.style.border = '4px solid #555';

    let field = [];

    let tetro = [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];

    // ブロックを描画
		function drawBlock(x, y) {
      let px = (tetroX + x) * blockSize;
      let py = (tetroY + y) * blockSize;
      ctx.fillStyle = 'salmon';
      ctx.fillRect(px, py, blockSize, blockSize);
			ctx.strokeStyle = '2px solid #555';
			ctx.strokeRect(px, py, blockSize, blockSize);
    }

    // テトロミノを作成
    function drawTetro() {
      for (let y = 0; y < tetroSize; y++) {
        for (let x = 0; x < tetroSize; x++) {
          if (tetro[y][x]) {
						drawBlock(x, y);
          }
        }
      }
    }
		drawTetro();
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 37:
					tetroX--;
					break;
				case 38:
					tetroY--;
					break;
				case 39:
					tetroX++;
					break;
				case 40:
					tetroY++;
					break;
				case 32:
					break;
			}
			drawTetro();
		}
  }
})
