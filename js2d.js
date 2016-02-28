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

// Basic 2D Component
function Component(view, width, height, color, x, y) {
  // define current view
  this.view = view

  // Object Properties
  this.width = width
  this.height = height
  this.x = x
  this.y = y

  // Set Context
  this.ctx = this.view.context

  // Draw Component Callback
  this.draw = function() {
    // Draw object
    this.drawShape()
  }

  // Draw Object
  this.drawShape = function(){
    this.ctx.fillStyle = color
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
