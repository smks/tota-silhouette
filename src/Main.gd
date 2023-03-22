tool
extends Node2D

onready var nightflicker = $CampsiteFireLight


# Called when the node enters the scene tree for the first time.
func _ready():
	nightflicker.start_flicker()
