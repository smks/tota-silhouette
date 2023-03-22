extends "res://addons/gut/test.gd"

var _Script = load("res://src/_ID.gd")
var obj


func before_each():
	obj = _Script.new()


func after_each():
	obj.free()


func test_main():
	pending('Need to write test for "_ID"')
