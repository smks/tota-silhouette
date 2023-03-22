extends Light2D

onready var tween := $Tween

const TIME_INTERVAL: int = 1

var is_enabled: bool = true
var running: bool = false


func _ready():
	pass


func start():
	self.visible = true
	is_enabled = true


func stop():
	self.visible = false
	is_enabled = false


func _process(delta):
	if not is_enabled:
		return

	if not running:
		running = true
		start_flicker()


func start_flicker():
	tween.interpolate_property(
		self, "energy", self.energy, rand_range(1.1, 1.5), TIME_INTERVAL, Tween.TRANS_LINEAR
	)
	tween.interpolate_callback(self, TIME_INTERVAL, "_stop")
	tween.start()


func _stop():
	running = false
