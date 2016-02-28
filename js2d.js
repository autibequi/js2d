// Basic Generic 2D Game View
function GameView(width, height, timeStep) {
  this.canvas = document.createElement("canvas")
  this.canvas.width = width
  this.canvas.height = height
  this.timeStep = timeStep
  this.context = this.canvas.getContext("2d")
  this.updateFunction = function(){}
  this.frameNo = 0
  this.isPaused = false
  this.gravityForce =  10

  this.setPlacement = function(placement){
    placement.insertBefore(this.canvas, placement.childNodes[0])
  }

  this.setUpdateFunction = function(updateFunction) {
    this.updateFunction = updateFunction
  }

  this.update = function(currentView) {
    this.clear()
    currentView.updateFunction()
  }

  this.clear = function() {
    if (this.frameNo > 1000)
      this.frameNo = 0
    this.frameNo += 1
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
  }

  this.everyInterval = function(n) {
    if ((this.frameNo / n) % 1 == 0) return true
      return false
  }

  this.start = function() {
    var currentView = this
    this.interval = setInterval(function() {
      if (!currentView.isPaused)
        currentView.update(currentView)
    }, this.timeStep)
  }

  this.pause = function() {
    this.isPaused = !this.isPaused
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

  // toggles
  this.gravity = false
  this.keepInsideCanvas = false

  // Force Vectors
  this.xAxisForce = 0
  this.yAxisForce = 0

  // Set Context
  this.ctx = this.view.context

  // Draw Component Callback
  this.draw = function() {
    // Simulate Gravity
    if(this.gravity){
      this.yAxisForce -= this.view.gravityForce
      this.y -= (this.yAxisForce * this.view.timeStep^2)/2/1000
    }

    // Keep object inside canvas
    if(this.keepInsideCanvas)
      this.keepInside()

    // Draw object
    this.drawShape()
  }

  // Draw Object
  this.drawShape = function(){
    this.ctx.fillStyle = color
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  // Keep Object inside canvas
  this.keepInside = function() {
    if (this.x + this.width > this.view.canvas.width){
      this.x = this.view.canvas.width - this.width
      this.xAxisForce = 0
    }
    if (this.y + this.height > this.view.canvas.height){
      this.y = this.view.canvas.height - this.height
      this.yAxisForce = 0
    }
    if (this.y < 0){
      this.y = 0
      this.yAxisForce = 0
    }
    if (this.x < 0){
      this.x = 0
      this.xAxisForce = 0
    }
  }

  // Checks colission with another component
  this.checkColision = function (obj) {
    // Exit with no intersection if found separated along an axis
    if(this.x > obj.x + obj.width  || this.x + this.width  < obj.x) return false
    if(this.y > obj.y + obj.height || this.y + this.height < obj.y) return false
    // No separating axis found, therefor there is at least one overlapping axis
    return true
  }
}
