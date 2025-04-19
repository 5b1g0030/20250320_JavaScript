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
        if(selectedTube){ // 如果有已選取的試管
            if(selectedTube !== tube){ // 如果選取的不是同一個試管
                pourWater(selectedTube, tube); // 將水從已選中的試管倒入新點擊的試管
            }
            selectedTube.classList.remove("selected"); // 移除選取的試管的選取狀態(CSS)
            selectedTube = null; // 清空選中的試管
        }
        else{ // 如果選取的不是同一個試管
            selectedTube = tube; // 將選取的試管儲存起來
            selectedTube.classList.add("selected"); // 將選取的試管加上選取狀態(CSS)
        }
    }

    // ----- 倒水
    function pourWater(fromTube, toTube){
        // 取得來源試管和目標試管最上方的水塊
        let fromWater = fromTube.querySelector(".water:last-child"); // 取得在上方的水塊
        let toWater = toTube.querySelector(".water:last-child");
        if(!toWater){ // 情況1：目標試管是空的
            const color = fromWater ? fromWater.style.backgroundColor : null; // 獲取來源水塊的顏色(條件 ? 條件為真時的值 : 條件為假時的值;)
            // 來源試管有水、顏色相同且目標試管未滿時，「倒水並更新來源試管最上方的數塊顏色」
            while(fromWater && fromWater.style.backgroundColor === color && toTube.childElementCount < 4){
                toTube.appendChild(fromWater); // 移動水塊到目標試管
                fromWater = fromTube.querySelector(".water:last-child"); // 更新來源試管的最上方水塊
            }
        }
        else{ // 情況2：目標試管有水
            // 來源有水、顏色與目標試管最上方水塊相同、目標試管未滿時，「倒水並更新來源試管和目標試管最上方的水塊顏色」
            while(fromWater && fromWater.style.backgroundColor === toWater.style.backgroundColor && toTube.childElementCount < 4){
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child"); // 更新來源試管的最上方水塊
                toWater = toTube.querySelector(".water:last-child"); // 更新目標試管的最上方水塊
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
        const gameColors = colors.slice(0,Math.min(levelCount+1, colors.length)); // 根據關卡編號決定填入顏色的種類
        const waterBlocks = []; // 水塊
        // 對於每個顏色產生四個block
        gameColors.forEach((color)=> {
            for (let i=0; i<4; i++){
                waterBlocks.push(color); // 將顏色加入 waterBlocks 陣列
            }
        });
        // 打亂水塊顏色
        waterBlocks.sort(()=> 0.5-Math.random()); //「快速隨機打亂陣列」寫法
        // 將waterBlocks的顏色分散在不同試管內
        let blockIndex = 0;
        tubes.slice(0, levelCount+1).forEach((tube)=>{
            for(let i=0; i<4; i++){
                if(blockIndex<waterBlocks.length){
                    const water = document.createElement("div"); // 創建 div 元素
                    water.classList.add("water"); // 將添加樣式(CSS)
                    water.style.backgroundColor = waterBlocks[blockIndex]; // 設定水塊的顏色(陣列分配)
                    water.style.height = "20%"; // 設定水塊的高度
                    tube.appendChild(water); // 將水塊加入 tube
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