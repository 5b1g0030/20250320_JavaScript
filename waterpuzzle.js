// ()=>箭頭函數，作為事件處理器，()裡可傳入參數
// document.getElementById("id"):從 HTML 文件中尋找並獲取特定 ID 的元素
document.addEventListener("DOMContentLoaded",()=>{ 
    const gameContainer = document.getElementById("game-container"); // 遊戲區(div)
    const playButton = document.getElementById("play-button"); // 遊戲開始按鈕
    const levelSelect = document.getElementById("level-select"); // 關卡選項(下拉選單)

    const tubes = []; // 試管
    const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "gray", "cyan", "magenta", "lime", "teal", "indigo", "violet"]; // 試管顏色
    let levelCount = 1; // 關卡編號(預設為 1)
    let selectedTube = null; // 選擇的試管

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
    // ----- 選擇試管
    function selectTube(tube){
        if(selectedTube){
            if(selectedTube !== tube){
                pourWater(selectedTube, tube); // 傳入兩個選取的試管
            }
            selectedTube.classList.remove("selected");
            selectedTube = null;
        }
        else{
            selectedTube = tube;
            selectedTube.classList.add("selected");
        }
    }
    // ----- 倒水
    function pourWater(fromTube, toTube){
        let fromWater = fromTube.querySelector(".water:last-child"); // 取得最後一個水塊
        let toWater = toTube.querySelector(".water:last-child");
        if(!toWater){
            const color = fromWater ? fromWater.style.backgroundColor : null;
            while(fromWater && fromWater.style.backgroundColor === color && toTube.childElementCount < 4){
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
            }
        }
        else{
            while(fromWater && fromWater.style.backgroundColor === toWater.style.backgroundColor && toTube.childElementCount < 4){
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
                toWater = toTube.querySelector(".water:last-child");
            }
        }
    }
    // ----- 創建試管
    function createTubes(){
        //gameContainer.innerHTML += "產生試管"; // 將文字顯示在網頁上
        gameContainer.innerHTML = "";
        tubes.length = 0; // 清空試管
        for(let i=0; i<levelCount+1; i++){
            const tube = document.createElement("div"); // 創建 div 元素
            tube.classList.add("tube"); // 將 tube樣式加入 tube 類別
            tube.addEventListener("click",()=>{selectTube(tube)}); // 新增試管tube事件處理常式
            gameContainer.appendChild(tube); // 將 tube 加入 gameContainer
            tubes.push(tube); // 將 tube 加入 tubes 陣列
        }
        // 新增兩個空的試管當作緩衝
        for(let i=0; i<2; i++){
            const empyTube = document.createElement("div");
            empyTube.classList.add("tube"); // 將 tube樣式加入 tube 類別
            empyTube.addEventListener("click",()=>{selectTube(empyTube)}); // 新增試管tube事件處理常式
            gameContainer.appendChild(empyTube);
            tubes.push(empyTube);
        }

    }
    // ----- 填入試管顏色
    function fillTubes(){
        //gameContainer.innerHTML += "填入試管顏色";
        const gameColors = colors.slice(0,Math.min(levelCount+1, colors.length)); // 根據關卡編號決定填入顏色的數量
        const waterBlocks = []; // 水塊
        // 對於每個顏色產生四個block
        gameColors.forEach((color)=> {
            for (let i=0; i<4; i++){
                waterBlocks.push(color);
            }
        });
        // 打亂水塊顏色
        waterBlocks.sort(()=> 0.5-Math.random());
        // 將waterBlocks的顏色分散在不同試管內
        let blockIndex = 0;
        tubes.slice(0, levelCount+1).forEach((tube)=>{
            for(let i=0; i<4; i++){
                if(blockIndex<waterBlocks.length){
                    const water = document.createElement("div");
                    water.classList.add("water");
                    water.style.backgroundColor = waterBlocks[blockIndex];
                    water.style.height = "20%";
                    tube.appendChild(water);
                    blockIndex++;  
                }
            }
        });

    }

    // ----- 開始遊戲(按鈕)
    // 事件監聽器："click" 表示被點擊時觸發
    playButton.addEventListener("click",()=>{
        //alert("遊戲開始"); // 彈出"遊戲開始"的訊息
        tubes.length = 0; // 清空試管
        createTubes(); // 創建試管
        fillTubes(); // 填入試管顏色


    });
    
});