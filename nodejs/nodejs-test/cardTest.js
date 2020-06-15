var Card = [
	
	{type:1,value:2},
	{type:1,value:3},
	{type:1,value:4},
	{type:1,value:5},
	{type:1,value:6},
	{type:1,value:7},
	{type:1,value:8},
	{type:1,value:9},
	{type:1,value:10},
	{type:1,value:11},  //j
	{type:1,value:12},  //Q
	{type:1,value:13},  //K
	{type:1,value:14},  //A

	{type:2,value:2},
	{type:2,value:3},
	{type:2,value:4},
	{type:2,value:5},
	{type:2,value:6},
	{type:2,value:7},
	{type:2,value:8},
	{type:2,value:9},
	{type:2,value:10},
	{type:2,value:11},  //j
	{type:2,value:12},  //Q
	{type:2,value:13},  //K
	{type:2,value:14},  //A

	{type:3,value:2},
	{type:3,value:3},
	{type:3,value:4},
	{type:3,value:5},
	{type:3,value:6},
	{type:3,value:7},
	{type:3,value:8},
	{type:3,value:9},
	{type:3,value:10},
	{type:3,value:11},  //j
	{type:3,value:12},  //Q
	{type:3,value:13},  //K
	{type:3,value:14},  //A

	{type:4,value:2},
	{type:4,value:3},
	{type:4,value:4},
	{type:4,value:5},
	{type:4,value:6},
	{type:4,value:7},
	{type:4,value:8},
	{type:4,value:9},
	{type:4,value:10},
	{type:4,value:11},  //j
	{type:4,value:12},  //Q
	{type:4,value:13},  //K
	{type:4,value:14},  //A
];

var CardType = {
				Single: 0,//单牌
				Pair : 1,  //对子
				SmallQueue:2, //A12
				Queue :3,   //顺子
				SameColor: 4, //金花
				Queue_SSS: 5,//顺金
				SSS : 6,   //3同
				};  

 function getCard(arry) {

	return arry.splice(getRondomIndex(arry),1)
}

function getRondomIndex(array) {
	//console.log("index==",Math.random()*array.length);
	return  [Math.floor(Math.random()*array.length)]
}
Array.prototype.CardType = 0;
function checkCardPatern(array){
	array.sort(function(a,b){ //console.log("compare--",a[0].value,b[0].value);
								return a[0].value-b[0].value;});
	//三张牌一样花色
	console.log(array);
	if( array[0][0].type==array[1][0].type&&array[0][0].type==array[2][0].type&&array[2][0].type==array[1][0].type)
	{
		if( array[2][0].value-array[1][0].value==1&&array[1][0].value-array[0][0].value==1)
			{
				console.log("顺金");
				array.CardType = CardType.Queue_SSS;
				return;
			}
		console.log("金花");
		array.CardType = CardType.SameColor;
		return;
	}
	if( array[2][0].value-array[1][0].value==1&&array[1][0].value-array[0][0].value==1)
	{
		if( array[2][0].value==14&&array[1][0].value==3&&array[0][0].value==1)
		{
			console.log("A23--顺子");
			array.CardType = CardType.SmallQueue;
			return;
		}

		console.log("顺子");
		array.CardType = CardType.Queue;
		return;

	}
	if(array[0][0].value==array[1][0].value&&array[0][0].value==array[2][0].value&&array[1][0].value==array[2][0].value)
	{
		console.log("3tong");
		array.CardType = CardType.SSS;
		return;
	}

	if( array[0][0].value==array[1][0].value||array[0][0].value==array[2][0].value||array[1][0].value==array[2][0].value)
	{
		console.log("对子");
		array.CardType = CardType.Pair;
		return;
	}
	console.log("单牌");
	array.CardType = CardType.Single;
}

function getThreeCard(array) {
	
	return [getCard(array),getCard(array),getCard(array),];
}
// var c = new Array();
// console.log(typeof(Card));
// console.log("before===");
// console.log(Card);

// console.log("getThreeCard===");
// var player1 = getThreeCard(Card)
// console.log(player1);

// console.log(player1[0][0].type)
// console.log(player1[1][0].type)
// console.log(player1[2][0].type)
// checkCardPatern(player1);
var result = {0:0,1:0,2:0,3:0,4:0,5:0,6:0};
var time = 1000;
for(var i = 1;i<=time;i++)
{
	var card = Card.slice(0);
	var player = getThreeCard(card);
	var player1 = getThreeCard(card);
	
	checkCardPatern(player);
	checkCardPatern(player1);
	compare(player,player1);
	 result[player.CardType]++;
	//getVauleSum(player);
	// console.log(player.CardType);
}

printResult(result);

function getPair(array)
{
	if (array[0][0].value==array[1][0].value)
	{
		return array[0][0].value;
	}
	if (array[1][0].value==array[2][0].value)
	{
		return array[1][0].value;
	}

}

function getPairSingle(array)
{
	if (array[0][0].value==array[1][0].value)
	{
		return array[2][0].value;
	}
	if (array[1][0].value==array[2][0].value)
	{
		return array[0][0].value;
	}

}

function getVauleSum(array)
{	var sum = 0;
	for(var x of array)
	{	
		// console.log("x==",x[0].value);
 		sum = sum+x[0].value;
	}
	// console.log("sum==",sum);
	return sum;
}

function compare(array1,array2) { //比较2手牌
	if(array1.CardType>array2.CardType)
	{
		console.log("fist large");
	}
	if(array1.CardType<array2.CardType)
	{
		console.log("second  large");
	}
	if(array1.CardType==array2.CardType) //牌型一样
	{

			var type  = array1.CardType;
			switch(type)
			{
				case CardType.Single:
				case CardType.SSS:
				case CardType.Queue:
				case CardType.SameColor:
				case CardType.SmallQueue:
				case CardType.Queue_SSS:
						for( var i = array1.length-1;i>0;i--)
						{
							if (array1[i][0].value-array2[i][0].value>0)
							{	
								   console.log("fist large");
									return;
							}
							if (array1[i][0].value-array2[i][0].value<0)
							{	
								   console.log("second large");
									return;
							}
						}
						console.log("same large");
						return;
						break;
				case CardType.Pair:
						if (getPair(array1)>getPair(array2))
						{
									console.log("fist large");
									return;
						}
						if (getPair(array1)<getPair(array2))
						{
							 		console.log("second large");
									return;
						}

						if (getPairSingle(array1)>getPairSingle(array2))
						{
									console.log("fist large");
									return;
						}
						if (getPairSingle(array1)<getPairSingle(array2))
						{
							 		console.log("second large");
									return;
						}

						
						console.log("same large");
						return;
						break;
				default:
			}
	}

}



function printResult (array) {
	console.log("单排==",result[0],"几率===",result[0]/time);
	console.log("对子==",result[1],"几率===",result[1]/time);
	console.log("A23==",result[2],"几率===",result[2]/time);
	console.log("顺子==",result[3],"几率===",result[3]/time);
	console.log("金花==",result[4],"几率===",result[4]/time);
	console.log("顺金==",result[5],"几率===",result[5]/time);
	console.log("3同==",result[6],"几率===",result[6]/time);
}

// player1.sort(function(a,b){ console.log("compare--",a[0].value,b[0].value);return a[0].value-b[0].value;});
// console.log(player1);
// console.log(getCard(Card));
// console.log("after===");
// console.log(Card);



