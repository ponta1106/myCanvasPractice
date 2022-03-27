new Vue({
  el: "#app",
  mounted() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.style.border = '4px solid #555';

    // フィールドのサイズ
      const fieldCol = 10;
      const fieldRow = 20;

    // ブロックのサイズ
      const blockSize = 50;
      const tetroSize = 4;

    // テトリス全体のサイズ
      const screenW = fieldCol * blockSize;
      const screenH = fieldRow * blockSize;

    // キャンバスのサイズ
      canvas.width = screenW;
      canvas.height = screenH;

    // テトロミノの座標
      let tetroX = 0;
      let tetroY = 0;

    // let img = new Image();
    // img.src = 'hamada.png';
    // 画像の読み込みが済んでから描画
    // img.onload = function() {
    //   ctx.drawImage(img, 0, 0, 300, 300);
    //   }
    // }

    let tetro = [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ];

    // フィールド全体
    let field = [];

    // フィールドの初期化
    function init() {
      for (let y = 0; y < fieldRow; y++) {
        field[y] = [];
        for (let x = 0; x < fieldCol; x++) {
          field[y][x] = 0;
        }
      }
      // 障害物
      field[5][8] = 1;
      field[19][0] = 1;
      field[19][9] = 1;
    }

    init();
    drawField();
		drawTetro();

    // フィールドを描画(10x20)
    function drawField() {
      ctx.clearRect(0, 0, screenW, screenH);
      for (let y = 0; y < fieldRow; y++) {
        for (let x = 0; x < fieldCol; x++) {
          if (field[y][x]) {
            drawBlock(x, y);
          }
        }
      }
    }

    // テトロミノを描画(4x4)
    function drawTetro() {
      for (let y = 0; y < tetroSize; y++) {
        for (let x = 0; x < tetroSize; x++) {
          if (tetro[y][x]) {
            drawBlock(tetroX + x, tetroY + y);
          }
        }
      }
    }

    // ブロック１つを描画
		function drawBlock(x, y) {
      let px = x * blockSize;
      let py = y * blockSize;
      ctx.fillStyle = 'salmon';
      ctx.fillRect(px, py, blockSize, blockSize);
      ctx.strokeStyle = '2px solid #555';
      ctx.strokeRect(px, py, blockSize, blockSize);
    }

    // 移動できるかチェック
    function checkMove(mx, my) {
      for (let y = 0; y < tetroSize; y++) {
        for (let x = 0; x < tetroSize; x++) {
          let nx = tetroX + mx + x;
          let ny = tetroY + my + y;
          if(tetro[y][x]) {
            if(
              nx >= fieldCol ||
              nx < 0 ||
              ny >= fieldRow ||
              ny < 0 ||
              field[ny][nx]
              )return false;
          }
        }
      }
      return true;
    }

    // キーボードが押されたときの処理
		document.onkeydown = function(e) {
			switch(e.keyCode) {
				case 37:
          if(checkMove(-1, 0))tetroX--;
					break;
        case 38:
          if(checkMove(0, -1))tetroY--;
					break;
        case 39:
          if(checkMove(1, 0))tetroX++;
					break;
				case 40:
					if(checkMove(0, 1))tetroY++;
					break;
				case 32:
					break;
			}
      drawField();
      drawTetro();
		}

  }
})
