// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var DomGraphs$Domgraphs = require("./DomGraphs.bs.js");

function gcd(_m, _n) {
  while(true) {
    var n = _n;
    var m = _m;
    if (m === n) {
      return m;
    }
    if (m > n) {
      _m = m - n;
      continue ;
    }
    _n = n - m;
    continue ;
  };
}

function lcm(m, n) {
  return m * n / gcd(m, n);
}

var element = document.getElementById("canvas");

var context = element.getContext("2d");

var canvasWidth = element.width;

var canvasHeight = element.height;

var centerX = canvasWidth / 2.0;

var centerY = canvasHeight / 2.0;

function toRadians(degrees) {
  return degrees * Math.PI / 180.0;
}

function toCartesian(param) {
  var theta = param.theta;
  var r = param.radius;
  return {
          cartesianX: r * Math.cos(toRadians(theta)),
          cartesianY: r * Math.sin(toRadians(theta))
        };
}

function toCanvas(param, amplitude) {
  return {
          canvasX: centerX / amplitude * param.cartesianX + centerX,
          canvasY: -centerY / amplitude * param.cartesianY + centerY
        };
}

function draw(_evt) {
  var formula1 = DomGraphs$Domgraphs.getFormula("1");
  var formula2 = DomGraphs$Domgraphs.getFormula("2");
  var amplitude = Math.max(1.0, Math.abs(formula1.factor) + Math.abs(formula2.factor));
  var evaluate = function (f, angle) {
    return f.factor * Curry._1(f.fcn, f.theta * toRadians(angle) + toRadians(f.offset));
  };
  var getPolar = function (theta) {
    var r1 = evaluate(formula1, theta);
    var r2 = evaluate(formula2, theta);
    return toCartesian({
                radius: r1 + r2,
                theta: theta
              });
  };
  var getLissajous = function (theta) {
    var r1 = evaluate(formula1, theta);
    var r2 = evaluate(formula2, theta);
    return {
            cartesianX: r1,
            cartesianY: r2
          };
  };
  context.fillStyle = "white";
  context.fillRect(0.0, 0.0, canvasWidth, canvasHeight);
  context.strokeStyle = "#999";
  context.beginPath();
  context.moveTo(0.0, centerY);
  context.lineTo(canvasWidth, centerY);
  context.moveTo(centerX, 0.0);
  context.lineTo(centerX, canvasHeight);
  context.closePath();
  context.stroke();
  var getXY = DomGraphs$Domgraphs.getTypeOfGraph(undefined) === /* Polar */0 ? getPolar : getLissajous;
  context.strokeStyle = "#000";
  context.lineWidth = 0.5;
  context.beginPath();
  var match = toCanvas(Curry._1(getXY, 0.0), amplitude);
  context.moveTo(match.canvasX, match.canvasY);
  var d = 1.0;
  var limit = 360.0 * lcm(formula1.theta, formula2.theta);
  while(d < limit) {
    var match$1 = toCanvas(Curry._1(getXY, d), amplitude);
    context.lineTo(match$1.canvasX, match$1.canvasY);
    d = d + 1.0;
  };
  context.closePath();
  context.stroke();
  requestAnimationFrame(function (param) {
        return draw(undefined);
      });
  
}

draw(undefined);

exports.gcd = gcd;
exports.lcm = lcm;
exports.element = element;
exports.context = context;
exports.canvasWidth = canvasWidth;
exports.canvasHeight = canvasHeight;
exports.centerX = centerX;
exports.centerY = centerY;
exports.toRadians = toRadians;
exports.toCartesian = toCartesian;
exports.toCanvas = toCanvas;
exports.draw = draw;
/* element Not a pure module */
