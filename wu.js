
window.onload=function(){
   //定义全局变量
   canv=document.getElementById("canvas");
   ctx=canv.getContext("2d");
    blorwh=true;
   matrix=new Array();
   for(var i=0;i<19;i++) {
       matrix[i]=new Array();
       for(var j=0;j<19;j++)
         matrix[i][j]=0;
   }
   //调用函数初始化棋盘
   init();
   //处理鼠标事件，实现落子
   $("#canvas").click(function(event){
       blorwh=placeStone(blorwh,event.offsetX,event.offsetY);
   });
}

function gameOver(stColor){
   ctx.font="bold 25px Arial";
   ctx.fillStyle="#058";
   if (stColor){
      ctx.fillText("蓝方获胜",200,200);
   }else{
      ctx.fillText("红方获胜",200,200);
   }
}
//初始化棋盘
function init(){
   ctx.beginPath();
   for(var i=0;i<19;i++){
     ctx.moveTo(10+30*i,10);
     ctx.lineTo(10+30*i,550);
     ctx.moveTo(10,10+30*i);
     ctx.lineTo(550,10+30*i);
   }
   ctx.stroke();
} 

//显示提示信息
function writeMessage(message){
   $("#message").text(message);
}
//实现落子函数
function placeStone(stColor,offx,offy){
     var ifPlace=true;
    //将棋子放在交叉处
    var _offx,_offy;
    var tempx=parseInt((offx-10)/30);
    var tempy=parseInt((offy-10)/30);
    if (offx-10-tempx*30<10&&offy-10-tempy*30<10){
         _offx=10+tempx*30;
         _offy=10+tempy*30;
    }else if (offx-10-tempx*30<10&&offy-10-tempy*30>20){
         _offx=10+tempx*30;
         _offy=10+(tempy+1)*30;
         tempy=tempy+1;
    }else if (offx-10-tempx*30>20&&offy-10-tempy*30<10){
        _offx=10+(tempx+1)*30;
        _offy=10+tempy*30;
        tempx=tempx+1;
    }else if (offx-10-tempx*30>20&&offy-10-tempy*30>20){
       _offx=10+(tempx+1)*30;
       _offy=10+(tempy+1)*30;
      tempy=tempy+1;
      tempx=tempx+1;
    }else{
       ifPlace=false;
       writeMessage("此处不能落子，只能在交叉处落子");
    }
    if (matrix[tempx][tempy]!=0)
      writeMessage("此处已经有棋子，请另着其他地方落子");
    //开始落子
   if (ifPlace&&matrix[tempx][tempy]==0){
     writeMessage("");//清空之前的提示信息
     ctx.beginPath();
     if (stColor){
       ctx.fillStyle="Blue";
       ctx.arc(_offx,_offy,8,0,Math.PI*2,false);
       matrix[tempx][tempy]=1;
     }else{
       ctx.fillStyle="red";
       ctx.arc(_offx,_offy,8,0,Math.PI*2,false);
       matrix[tempx][tempy]=2;
     }
    ctx.fill();
    //结果检测
    if (check0(tempx,tempy)||check90(tempx,tempy)||
          check45(tempx,tempy)||check135(tempx,tempy))
       { ctx.clearRect(0,0,590,590);
          gameOver(stColor);
       }
    stColor=!stColor;
   }
    return stColor;
}
//在0度方向上，从当前位置开始有连续的5个同颜色棋子
var have0=function(offx,offy){
  if (offx>=0&&offy>=0){
   if (matrix[offx][offy]==matrix[offx+1][offy]&&
       matrix[offx][offy]==matrix[offx+2][offy]&&
        matrix[offx][offy]==matrix[offx+3][offy]&&
          matrix[offx][offy]==matrix[offx+4][offy]){
      return true;
   }
    else return false;
  }else return false;
}
//获胜检测(水平方向上）
var check0=function(offx,offy){
   if (have0(offx-4,offy)||have0(offx-3,offy)||have0(offx-2,offy)
        ||have0(offx-1,offy)||have0(offx,offy))
   return true;
   else return false;
}
//在90度方向上，从当前位置开始有连续的5个同颜色棋子
var have90=function(offx,offy){
 if (offx>=0&&offy>=0){
  if (matrix[offx][offy]==matrix[offx][offy+1]&&
       matrix[offx][offy]==matrix[offx][offy+2]&&
        matrix[offx][offy]==matrix[offx][offy+3]&&
          matrix[offx][offy]==matrix[offx][offy+4]){
      return true;
   }
  else return false;
  }else return false;
}
//获胜检测(垂直方向上）
var check90=function(offx,offy){
   if (have90(offx,offy-4)||have90(offx,offy-3)||have90(offx,offy-2)
        ||have90(offx,offy-1)||have90(offx,offy))
   return true;
   else return false;
}
//在45度方向上，从当前位置开始有连续的5个同颜色棋子
var have45=function(offx,offy){
 if (offx>=0&&offy>=0){
  if (matrix[offx][offy]==matrix[offx+1][offy+1]&&
       matrix[offx][offy]==matrix[offx+2][offy+2]&&
        matrix[offx][offy]==matrix[offx+3][offy+3]&&
          matrix[offx][offy]==matrix[offx+4][offy+4]){
      return true;
   }
  else return false;
 }else return false;
}
//获胜检测(对角方向上）
var check45=function(offx,offy){
   if (have45(offx-4,offy-4)||have45(offx-3,offy-3)||have45(offx-2,offy-2)
        ||have45(offx-1,offy-1)||have45(offx,offy))
   return true;
   else return false;
}
//在135度方向上，从当前位置开始有连续的5个同颜色棋子
var have135=function(offx,offy){
 if (offx-4>=0&&offy>=0){
  if (matrix[offx][offy]==matrix[offx-1][offy+1]&&
       matrix[offx][offy]==matrix[offx-2][offy+2]&&
        matrix[offx][offy]==matrix[offx-3][offy+3]&&
          matrix[offx][offy]==matrix[offx-4][offy+4]){
      return true;
   }
  else return false;
 }else return false;
}
//获胜检测(水平方向上）
var check135=function(offx,offy){
   if (have135(offx+4,offy-4)||have135(offx+3,offy-3)||have135(offx+2,offy-2)
        ||have135(offx+1,offy-1)||have135(offx,offy))
   return true;
   else return false;
}