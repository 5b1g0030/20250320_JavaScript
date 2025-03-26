// ()=>箭頭函數，作為事件處理器，()裡可傳入參數
document.addEventListener("DOMContentLoaded",()=>{ 
    const gameContainer = document.getElementById("game-container");
    const playButton = document.getElementById("play-button");
    const levelSelect = document.getElementById("level-select"); // 從 HTML 文件中尋找並獲取特定 ID 的元素

    const tubes = []; // 試管
    let levelCount = 1; // 關卡編號(預設為 1)

    // ----- 根據玩家選擇顯示關卡編號
    function chooseLabel(level){
        levelCount = level;
        document.getElementById("level-count").textContent = levelCount;
    }
    // ----- 選擇關卡(下拉選單)
    // 事件監聽器："change" 表示當下拉選單的值改變時觸發
    levelSelect.addEventListener("change",(event)=>{
        // event.target.value：指向觸發事件的元素獲取當前選中的值，10 表示使用十進位轉換
        const selectedLevel = parseInt(event.target.value, 10);
        chooseLabel(selectedLevel); // 傳入玩家選擇的關卡編號
    });

    // ----- 開始遊戲(按鈕)
    playButton.addEventListener("click",()=>{
        alert("遊戲開始"); // 彈出"遊戲開始"的訊息
        

    });
    
});