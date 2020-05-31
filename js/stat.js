'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BARS_SPACING = 50;
var BARS_LEFT_SPACING = 40;
var BARS_TOP_SPACING = 80;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  // Нарисуем облако
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  // Найдем максимальный счет
  var maxTime = getMaxElement(times);

  ctx.textBaseline = 'hanging';
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  for (var i = 0; i < players.length; i++) {
    // Рассчитаем высоту текущей колонки гистограммы
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;

    // Цвет для подписей - черный
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    // Выведем счет текущего игрока
    ctx.fillText(
        Math.round(times[i]).toString(),
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT - barHeight - GAP * 2
    );

    // Выведем имя текущего игрока
    ctx.fillText(
        players[i],
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT + GAP
    );

    // Определим цвет текущего игрока
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var playerSaturation = Math.round(Math.random() * 100);
      ctx.fillStyle = 'hsl(240, ' + playerSaturation + '%, 50%)';
    }

    // Нарисуем колонку игрока
    ctx.fillRect(
        CLOUD_X + BARS_LEFT_SPACING + (BAR_WIDTH + BARS_SPACING) * i,
        CLOUD_Y + BARS_TOP_SPACING + BAR_MAX_HEIGHT - barHeight,
        // (barWidth * times[i]) / maxTime,
        BAR_WIDTH,
        barHeight
    );
  }
};
