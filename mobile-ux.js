/* Loạn 12 Sứ Quân V0.9 — điều khiển bàn cờ bằng vuốt trên màn hình cảm ứng.
   Không thay đổi Battle Engine hay dữ liệu lưu V0.8. */
(()=>{'use strict';
 const board=document.getElementById('board');
 if(!board)return;
 let gesture=null,suppressUntil=0;
 const getCell=target=>target instanceof Element?target.closest('#board .cell'):null;
 function indexOf(cell){return cell?Array.prototype.indexOf.call(board.children,cell):-1}
 board.addEventListener('pointerdown',event=>{
   if(event.pointerType==='mouse'||event.button!==0)return;
   const cell=getCell(event.target),index=indexOf(cell);
   if(index<0)return;
   gesture={pointerId:event.pointerId,index,x:event.clientX,y:event.clientY};
 },{passive:true});
 board.addEventListener('pointerup',event=>{
   const g=gesture;gesture=null;
   if(!g||event.pointerId!==g.pointerId)return;
   const dx=event.clientX-g.x,dy=event.clientY-g.y;
   if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;
   const horizontal=Math.abs(dx)>Math.abs(dy);
   const row=Math.floor(g.index/7),col=g.index%7;
   const next=horizontal?(dx>0&&col<6?g.index+1:dx<0&&col>0?g.index-1:-1):(dy>0&&row<6?g.index+7:dy<0&&row>0?g.index-7:-1);
   if(next<0)return;
   const first=board.children[g.index],second=board.children[next];
   if(!first||!second)return;
   suppressUntil=performance.now()+450;
   // Các ô được render lại sau khi chọn; lấy lại phần tử mới trước khi chọn ô thứ hai.
   first.click();
   const fresh=board.children[next];
   if(fresh)fresh.click();
 },{passive:true});
 board.addEventListener('pointercancel',()=>{gesture=null},{passive:true});
 board.addEventListener('click',event=>{
   if(performance.now()>suppressUntil||event.detail===0)return;
   // Chặn click tổng hợp do trình duyệt sinh sau thao tác vuốt.
   if(event.isTrusted){event.stopImmediatePropagation();event.preventDefault()}
 },true);
})();