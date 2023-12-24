function drawLineWithArrows(x0,y0,x1,y1,aWidth,aLength){
  let c = document.createElement("canvas");
  c.width = 55;
  c.height = 40;
  let ctx = c.getContext("2d");  
  let dx=x1-x0;
  let dy=y1-y0;
  let angle=Math.atan2(dy,dx);
  let length=Math.sqrt(dx*dx+dy*dy);
  
  ctx.translate(x0,y0);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(length,0);
  ctx.moveTo(length-aLength,-aWidth);
  ctx.lineTo(length,0);
  ctx.lineTo(length-aLength,aWidth);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgb(223, 231, 231)";
  ctx.stroke();
  ctx.setTransform(1,0,0,1,0,0);
  return c;
}

function drawArrow(){
  let arrow = drawLineWithArrows(0, 20, 50, 20, 12, 12);
  return arrow;
}

