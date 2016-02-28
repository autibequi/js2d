// Basic Generic 2D Game View
function GameView(width, height, timeStep) {
  this.canvas = document.createElement("canvas")
  this.canvas.width = width
  this.canvas.height = height
  this.timeStep = timeStep
  this.context = this.canvas.getContext("2d")
  this.updateFunction = function(){}
  
  this.setPlacement = function(placement){
    placement.insertBefore(this.canvas, placement.childNodes[0])
  }

  this.setUpdateFunction = function(updateFunction) {
    this.updateFunction = updateFunction
  }

  this.update = function(currentView) {
    currentView.updateFunction()
  }

  this.start = function() {
    var currentView = this
    this.interval = setInterval(function() {
      currentView.update(currentView)
    }, this.timeStep)
  }
}
