function polyfiller(){
    
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {
  
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
  
        
        var o = Object(this);
  
        
        var len = o.length >>> 0;
  
        
        if (len === 0) {
          return false;
        }
  
        
        var n = fromIndex | 0;
  
        
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
  
        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }
  
        
        while (k < len) {
          
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
         
          k++;
        }
  
       
        return false;
      }
    });
  }
    if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
  
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  
  
  }
  polyfiller();
  
  function Event(sender) {
      this._sender = sender;
      this._listeners = [];
  }
  
  Event.prototype = {
      attach: function (listener) {
          this._listeners.push(listener);
      },
      notify: function (args) {
          for (let index = 0; index < this._listeners.length; index += 1) {
              this._listeners[index](this._sender, args);
          }
      }
  };
  
  function CalculatorModel() {
 
      let _chain = [];
      let _result = [0];
      const _this = this;

  
      _this.getChain = function () {
          return _chain;
      };
  
  
      _this.isChainEmpty = function () {
          return _chain.length === 0;
      };
  
      _this.emptyChain = function () {
          _chain = [];
          return _this;
      };
  
      _this.addToChain = function (value) {
          _chain.push(value);
      };
  
      _this.getResult = function () {
          return _result;
      };
  
      _this.emptyResult = function () {
          _result = [];
          return _this;
      };
  
      _this.addToResult = function (value) {
          _result.push(value);
          return _this;
      };
  
      _this.removeLastElementFromResult = function () {
          _result.pop();
      };
  }
  
  function CalculatorView(chainElement, resultElement, buttonsElements) {

      let _chainElement = chainElement;
      let _resultElement = resultElement;
      const _this = this;
      const _buttons = {
          CE: buttonsElements.CE,
          C: buttonsElements.C,
          backspace: buttonsElements.backspace,
          division: buttonsElements.division,
          multiplication: buttonsElements.multiplication,
          subtraction: buttonsElements.subtraction,
          addition: buttonsElements.addition,
          dot: buttonsElements.dot,
          equals: buttonsElements.equals,
          num0: buttonsElements.num0,
          num1: buttonsElements.num1,
          num2: buttonsElements.num2,
          num3: buttonsElements.num3,
          num4: buttonsElements.num4,
          num5: buttonsElements.num5,
          num6: buttonsElements.num6,
          num7: buttonsElements.num7,
          num8: buttonsElements.num8,
          num9: buttonsElements.num9
      };
      const _maxChainLength = 28;
  
      function _shortenNumber(number) {
          if(number < 0)
              return Number(number).toExponential(_this.getMaxResultDisplayLength() - 7);
          return Number(number).toExponential(_this.getMaxResultDisplayLength() - 6);
      }
  
      function _shortenChain(chain) {
          return "&laquo; " + chain.join('').substr(chain.join('').length - _maxChainLength);
      }
  
      function _isItOperator(element) {
          return isNaN(element) && /[=/x+-]/.test(element);
      }
  
      function _isNumberTooLong(number) {
          return number.toString().length > _this.getMaxResultDisplayLength();
      }
  
      function _addSpaceToOperators(operator) {
          return " " + operator + " ";
      }
  
      function _addSpaceToChain(chain) {
          chain.forEach(function (element, index, array) {
              if (_isItOperator(element))
                  array[index] = _addSpaceToOperators(element);
          });
      }
  
      function _isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
      }
  
      function _shortenLongNumbers(chain) {
          chain.forEach(function (element, index, array) {
              if (_isNumber(element))
                  if (_isNumberTooLong(element))
                      array[index] = _shortenNumber(element);
          });
      }
  
      function _renderResult(result) {
          _resultElement.innerHTML = result.join('');
          if (result.join("").length > _this.getMaxResultDisplayLength())
              _resultElement.innerHTML = _shortenNumber(result);
      }
  
      function _renderChain(chain) {
  
          _addSpaceToChain(chain);
          _shortenLongNumbers(chain);
          _chainElement.innerHTML = chain.join('');
          if (chain.join('').length > _maxChainLength)
              _chainElement.innerHTML = _shortenChain(chain);
      }
  
 
      function _attachListeners() {
          _buttons.CE.onclick = function () {
              _this.events.ceClicked.notify();
          };
          _buttons.C.onclick = function () {
              _this.events.cClicked.notify();
          };
          _buttons.backspace.onclick = function () {
              _this.events.backspaceClicked.notify();
          };
          _buttons.division.onclick = function () {
              _this.events.divisionClicked.notify();
          };
          _buttons.multiplication.onclick = function () {
              _this.events.multiplicationClicked.notify();
          };
          _buttons.subtraction.onclick = function () {
              _this.events.subtractionClicked.notify();
          };
          _buttons.addition.onclick = function () {
              _this.events.additionClicked.notify();
          };
          _buttons.dot.onclick = function () {
              _this.events.dotClicked.notify();
          };
          _buttons.equals.onclick = function () {
              _this.events.equalsClicked.notify();
          };
          _buttons.num0.onclick = function () {
              _this.events.num0Clicked.notify();
          };
          _buttons.num1.onclick = function () {
              _this.events.num1Clicked.notify();
          };
          _buttons.num2.onclick = function () {
              _this.events.num2Clicked.notify();
          };
          _buttons.num3.onclick = function () {
              _this.events.num3Clicked.notify();
          };
          _buttons.num4.onclick = function () {
              _this.events.num4Clicked.notify();
          };
          _buttons.num5.onclick = function () {
              _this.events.num5Clicked.notify();
          };
          _buttons.num6.onclick = function () {
              _this.events.num6Clicked.notify();
          };
          _buttons.num7.onclick = function () {
              _this.events.num7Clicked.notify();
          };
          _buttons.num8.onclick = function () {
              _this.events.num8Clicked.notify();
          };
          _buttons.num9.onclick = function () {
              _this.events.num9Clicked.notify();
          };
          _buttons.num0.onclick(function () {
              _this.events.num0Clicked.notify();
          });
      }
  

      _this.events = {
          ceClicked: new Event(_this),
          cClicked: new Event(_this),
          backspaceClicked: new Event(_this),
          divisionClicked: new Event(_this),
          multiplicationClicked: new Event(_this),
          subtractionClicked: new Event(_this),
          additionClicked: new Event(_this),
          dotClicked: new Event(_this),
          equalsClicked: new Event(_this),
          num0Clicked: new Event(_this),
          num1Clicked: new Event(_this),
          num2Clicked: new Event(_this),
          num3Clicked: new Event(_this),
          num4Clicked: new Event(_this),
          num5Clicked: new Event(_this),
          num6Clicked: new Event(_this),
          num7Clicked: new Event(_this),
          num8Clicked: new Event(_this),
          num9Clicked: new Event(_this)
      };
      _this.getMaxResultDisplayLength = function () {
          return 13;
      };
  
      _this.render = function (viewModel) {
          _renderResult(viewModel.result);
          _renderChain(viewModel.chain);
      };
  
      
      _this.getResult = function () {
          return _resultElement.innerHTML;
      };
  
      _this.getChain = function () {
          return _chainElement.innerHTML;
      };
      _attachListeners();
  }
  
  function CalculatorController(model, view) {
  
      const _model = model;
      const _view = view;
      let _isResultCalculated = false;
  
      function _resultIsNaN() {
          return _model.getResult().includes(NaN);
      }
  
      function _resultHasDot() {
          return _model.getResult().join("").includes(".");
      }
  
      function _resultIsOperator() {
          let result = _model.getResult()[0];
          switch (result) {
              case "/":
              case "x":
              case "-":
              case "+":
                  return true;
              default:
                  return false;
          }
      }
  
      function _chainHasEqualSign() {
          return _model.getChain().includes("=");
      }
  
      function _getViewModel() {
          return {
              chain: _model.getChain().slice(),
              result: _model.getResult().slice()
          };
      }
  
      function _addOperator(operator) {
          if (_resultIsNaN()) {
              _view.beep();
              return;
          }
  
          if (_chainHasEqualSign()) {
              _model.emptyChain().addToChain(Number(_model.getResult().join("")));
          } else if (!_resultIsOperator())
              _model.addToChain(Number(_model.getResult().join("")));
  
          _model.emptyResult().addToResult(operator);
          _isResultCalculated = false;
          _view.render(_getViewModel());
      }
  
      function _addNumber(number) {
          if (_model.getResult().join("") === "0" || _isResultCalculated)
              _model.emptyResult();
  
          if (_model.getResult().join('').length >= _view.getMaxResultDisplayLength()) {
              _view.beep();
              return;
          }
  
          else if (_resultIsOperator()) {
              _model.addToChain(_model.getResult()[0]);
              _model.emptyResult();
          }
  
          _model.addToResult(number);
          _view.render(_getViewModel());
          _isResultCalculated = false;
      }
  
      function _equals() {
          function calculateChain(chain) {
              for (let i = 0; i < chain.length; i++) {
                  if (chain[i] === "x") {
                      chain[i - 1] = chain[i - 1] * chain[i + 1];
                      chain.splice(i, 2);
                      i--;
                  } else if (chain[i] === "/") {
                      chain[i - 1] = chain[i - 1] / chain[i + 1];
                      chain.splice(i, 2);
                      i--;
                  }
              }
              for (let i = 0; i < chain.length; i++) {
                  if (chain[i] === "+") {
                      chain[i - 1] = chain[i - 1] + chain[i + 1];
                      chain.splice(i, 2);
                      i--;
                  } else if (chain[i] === "-") {
                      chain[i - 1] = chain[i - 1] - chain[i + 1];
                      chain.splice(i, 2);
                      i--;
                  }
              }
            
              return chain[0];
          }
  
          if (_chainHasEqualSign()) return;
          if (_model.isChainEmpty()) return;
          if (/[/x+-]/.test(_model.getChain()[_model.getChain().length - 1]) &&
              !_resultIsOperator())
              _model.addToChain(Number(_model.getResult().join("")));
  
    
          let chain = _model.getChain().slice();
          _model.addToChain("=");
          let result = calculateChain(chain);
          _model.emptyResult().addToResult(result);
          _model.addToChain(result);
          _view.render(_getViewModel());
          _isResultCalculated = true;
      }
  
      function _dot() {
          if (_isResultCalculated)
              _model.emptyResult().addToResult(0);
          else if (_resultHasDot()) {
              _view.beep();
              return;
          } else if (_resultIsOperator()) {
              _addOperator(_model.getResult().join(""));
              _addNumber(0);
          }
  
          _model.addToResult(".");
          _isResultCalculated = false;
          _view.render(_getViewModel());
      }
  
      function _setEvents() {
          _view.events.ceClicked.attach(function () {
              _model.emptyResult().addToResult(0);
              _isResultCalculated = false;
              _view.render(_getViewModel());
          });
  
          _view.events.cClicked.attach(function () {
              _model
                  .emptyChain()
                  .emptyResult()
                  .addToResult(0);
              _isResultCalculated = false;
              _view.render(_getViewModel());
          });
  
          _view.events.backspaceClicked.attach(function () {
              if (_model.getResult().join("") === "0") {
                  _view.beep();
                  return;
              }
              if (_model.getResult().length === 1) _model.emptyResult().addToResult(0);
              else _model.removeLastElementFromResult();
              _isResultCalculated = false;
              _view.render(_getViewModel());
          });
  
          _view.events.divisionClicked.attach(function () {
              _addOperator("/");
          });
          _view.events.multiplicationClicked.attach(function () {
              _addOperator("x");
          });
          _view.events.subtractionClicked.attach(function () {
              _addOperator("-");
          });
  
          _view.events.additionClicked.attach(function () {
              _addOperator("+");
          });
  
  
          _view.events.dotClicked.attach(function () {
              _dot();
          });
  
          _view.events.equalsClicked.attach(function () {
              _equals();
          });
  
          _view.events.num0Clicked.attach(function () {
              if (_model.getResult().join("") === "0") return;
              _addNumber(0);
          });
  
          _view.events.num1Clicked.attach(function () {
              _addNumber(1);
          });
          _view.events.num2Clicked.attach(function () {
              _addNumber(2);
          });
          _view.events.num3Clicked.attach(function () {
              _addNumber(3);
          });
          _view.events.num4Clicked.attach(function () {
              _addNumber(4);
          });
          _view.events.num5Clicked.attach(function () {
              _addNumber(5);
          });
          _view.events.num6Clicked.attach(function () {
              _addNumber(6);
          });
          _view.events.num7Clicked.attach(function () {
              _addNumber(7);
          });
          _view.events.num8Clicked.attach(function () {
              _addNumber(8);
          });
          _view.events.num9Clicked.attach(function () {
              _addNumber(9);
          });
      }
  
      _setEvents();
      _view.render(_getViewModel());
  
 
  }
  
  $(document).ready(function() {
  
  
      var controller = new CalculatorController(
          new CalculatorModel(),
          new CalculatorView(
              document.getElementById("chain"),
              document.getElementById("result"),
              {
                  CE: document.getElementById("CE"),
                  C: document.getElementById("C"),
                  backspace: document.getElementById("backspace"),
                  division: document.getElementById("division"),
                  num7: document.getElementById("num7"),
                  num8: document.getElementById("num8"),
                  num9: document.getElementById("num9"),
                  multiplication: document.getElementById("multiplication"),
                  num4: document.getElementById("num4"),
                  num5: document.getElementById("num5"),
                  num6: document.getElementById("num6"),
                  subtraction: document.getElementById("subtraction"),
                  num1: document.getElementById("num1"),
                  num2: document.getElementById("num2"),
                  num3: document.getElementById("num3"),
                  addition: document.getElementById("addition"),
                  num0: document.getElementById("num0"),
                  dot: document.getElementById("dot"),
                  equals: document.getElementById("equals")
              }
          )
      );
  });
  
  