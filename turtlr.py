#!/usr/bin/python
# -*- coding: UTF-8 -*-
import turtle 

turtle.title('redFlag')

turtle.screensize(800, 600)
turtle.speed(10)




def drawRect(x,y,width,height,color):
	turtle.begin_fill()
	turtle.fillcolor(color)
	turtle.up()
	turtle.goto(-width/2,height/2)
	turtle.down()
	for x in range(4):
		if x%2 == 0:
			turtle.forward(width)
		else:
			turtle.forward(height)
		
		turtle.right(90)
		
	turtle.end_fill()



def draWuxing(x,y,size,color,angle):
	turtle.up()
	turtle.goto(x,y)
	turtle.down()
	turtle.color(color)
	turtle.begin_fill()
	turtle.left(angle)
	for i in range(5):
		turtle.forward(size)
		turtle.right(144)
	turtle.end_fill()

drawRect(0,0,400,200,"#ff0000")
draWuxing(-180,50,50,"yellow",0)

draWuxing(-120,70,25,"yellow",60)
draWuxing(-85,45,25,"yellow",30)
draWuxing(-75,10,25,"yellow",30)
draWuxing(-95,-0,25,"yellow",60)

# draWuxing(-90,15,25,"yellow",60)
turtle.hideturtle()
turtle.done()



# import turtle
# turtle.speed(10)
# #红色的旗面
# def qimian(x,y,color):
#     turtle.up()
#     turtle.goto(x,y)
#     turtle.down()
#     turtle.color(color)
#     turtle.begin_fill()
#     for i in range(1,5):
#         if i % 2 == 0:
#             turtle.forward(205)
#         else:
#             turtle.forward(285)
#         turtle.left(90)
#     turtle.end_fill()
 
# #黄色的五角星(大)
# def wujiaoxing(x,y,color):
#     turtle.up()
#     turtle.goto(x,y)
#     turtle.down()
#     turtle.color(color)
#     turtle.begin_fill()
#     for i in range(5):
#         turtle.forward(30)
#         turtle.right(144)
#     turtle.end_fill()
 
# #四个小五角星
# def xiaowujiao(x,y,single):
#     turtle.up()
#     turtle.goto(x,y)
#     turtle.left(single)
#     turtle.down()
#     turtle.color("yellow")
#     turtle.begin_fill()
#     for i in range(5):
#         turtle.forward(12)
#         turtle.right(144)
#     turtle.end_fill()
 
# qimian(-110,-90,"red")
# wujiaoxing(-85,55,"yellow")
# xiaowujiao(-35,80,30)
# xiaowujiao(-14,55,60)
# xiaowujiao(-12,28,30)
# xiaowujiao(-22,10,60)
# turtle.hideturtle()
# turtle.done()