extends "res://addons/gut/test.gd"

var _Scene = load("res://src/_ID.tscn")
var scene

var obj = null
var expected_methods = ["_ready"]


func before_each():
	scene = _Scene.instance()
	add_child(scene)


func after_each():
	remove_child(scene)
	scene.free()


func test_main():
	pending('Need to write a test for "_ID"')
