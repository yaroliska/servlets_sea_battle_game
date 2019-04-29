class Cell {

    constructor(i,j,state='0'){
        this.y = i;
        this.x= j;
        this.state = state;
    }
    //0-пустая ячейка; 1-проверенная пустая ячейка(мимо); 2-проверенная клетка с кораблем противника(ранил/убил); 3-гарантированно пустая клетка; 4 -клетка с вашим кораблём?
    fresh(){
        status
        //метод из филлера, который рисует что ячейка занята
    }
    hit_by(){
        this.status="1";
        //метод из филлера, которы рисует точку на этой ячейке
    }
    hurt(){
        //метод из филлера, который рисует что ячейка занята
    }
    killed(){

    }
    getIntState(){
        //преобразовать строку в число
    }
}
class Ship {
    constructor(cells=[], state=null){
        this.cells=cells;
        this.state=state;
    }
    addCell(cell){
        this.cells.push(cell);
    }
}
class Armada {
    constructor(ships=[]){
        this.ships=ships;
    }
}

console.log('ArrangeTheShips');
const n=10;
const nn=n*n;
let myShips;
let createShipsMatr = [];
let gameState=0;
logic();


function logic(){
    if (gameState === 0) {
        //рисуем страницу заполнения кораблей
        drawCreateShipsPage();
        //пересоздаем вспомогательную матрицу для алгоритма проверки валидности заполнения
        fillCreateShipsMatr();
        //добавляем нужную реакцию на клики по матрице
        addListener();
    }
}

function addListener(){
    let list = document.getElementsByClassName('cell-hover');
    console.log(list);
    for(let i=0; i<nn; i++){
        list[i].addEventListener( "click" , clickCell);
    }
}

function clickCell(){
    console.log('id of cell(ClickCell): '+this.id);
    let i=parseInt(this.id[this.id.length-2]);
    let j=parseInt(this.id[this.id.length-1]);

    //если ячейка пуста и ее хотят закрасить
    if (createShipsMatr[i][j]===false){
        //проверяем на то, что ее можно закрасить
        if (isAvailable(i,j)) {
            let cell = document.getElementById(this.id);
            console.log(cell);
            cell.classList.add('my-ship-cell');
            console.log('успех');
        }
        else{
            console.log ('нельзя');
        }
    }
    else{
        //если ячейка уже закрашена удалить
        let cell = document.getElementById(this.id);
        console.log(cell);
        cell.classList.remove('my-ship-cell');
        unset(i,j);
        let btn = document.getElementsByClassName('btn__begin-game');
        btn[0].style.visibility = "hidden";
    }
}

function isAvailable(i,j){
    if (checkDiagonalCollision(createShipsMatr,i,j)===false){//если мы не прошли проверку на диагональные элементы
        createShipsMatr[i][j]=true;
        //запускаем проверку как будто элемент добавлен
        let ships = findShips(createShipsMatr);
        let ship4=0;
        let ship3=0;
        let ship2=0;
        let ship1=0;
        let k=0;
        console.log(ships);
        while(k<ships.length){

            if (ships[k].cells.length===1) ship1++;
            else if (ships[k].cells.length===2) ship2++;
            else if (ships[k].cells.length===3) ship3++;
            else if (ships[k].cells.length===4) ship4++;
            else if (ships[k].cells.length>4) {
                createShipsMatr[i][j]=false;
                return false;
            }
            if((ship4+ship3+ship2+ship1)   >10){
                //лишний однопалубник
                //выкинуть ошибку что таких кораблей >
                createShipsMatr[i][j]=false;
                return false;
            }
            if((ship4+ship3+ship2)   >6){
                //лишний двухпалубник
                //выкинуть ошибку что таких кораблей >
                createShipsMatr[i][j]=false;
                return false;
            }
            if((ship4+ship3)>3){
                //лишний трёхпалубник
                //выкинуть ошибку что таких кораблей >
                createShipsMatr[i][j]=false;
                return false;
            }
            if(ship4>1){
                //лишний четырехпалубник
                //выкинуть ошибку что таких кораблей >
                createShipsMatr[i][j]=false;
                return false;
            }
            k++;
        }
        if((ship1===4)&&(ship2===3)&&(ship3===2)&&(ship4===1)){
            let btn = document.getElementsByClassName('btn__begin-game');
            btn[0].style.visibility = "visible";
            btn[0].addEventListener( "click" , clickBeginGame);
            myShips =ships;
            setMyShipCellsStatus();
            testFunction();
        }
        return true;
    }
    else{
        //выкини ошибку пользователю про диагональ
        createShipsMatr[i][j]=false;
        return false;
    }
}

function checkDiagonalCollision(matr,i,j) {
    console.log(matr);
    console.log('i'+i+','+'j'+j);
    return  collisionWith(matr,i+1,j+1) ||
        collisionWith(matr,i+1,j-1) ||
        collisionWith(matr,i-1,j+1) ||
        collisionWith(matr,i-1,j-1);
}

function collisionWith(matr,i,j){
    if(i<0 || j<0 || i>9 || j>9)
        return false;
    return matr[i][j];
}
/*           else if ((i===(n-1))&&(j===(n-1))&&(matr[i-1][j-1]===true)){
               console.log('Нельзя размещать корабль так близко!');
               return false;
           }
               else if ((i===0)&&(j===(n-1))&&(matr[i+1][j-1]===true)){
                   console.log('Нельзя размещать корабль так близко!');
                   return false;
               }
                   else if ()

   return true;
}*/

function fillCreateShipsMatr(){
    for (let i=0; i<n; i++) {
        //значения в матрице = false, что эквивалентно незакрашенным ячейкам
        createShipsMatr.push([false,false,false,false,false,false,false,false,false,false]);
    }
}
//функция установки значения false ячейке (незакрашено)
const unset=(x,y)=>createShipsMatr[x][y]=false;

//функция установки значения false ячейке (закрашено)
const set=(x,y)=>createShipsMatr[x][y]=true;

findShips=(mtr)=>{
    const ships=[];
    const unChecked = mtr.map((val)=>val.map((v)=>true));//ставим в соответствие нашей матрице матрицу с true (в ней rue - непроверенное)
    for(let i in mtr)
        for (let j in mtr[i]){
            if(unChecked[i][j]){
                unChecked[i][j] = false;
                if(mtr[i][j]){
                    const shipBelow = shipUnder(i,j,mtr,unChecked);
                    const shipAtTheRight = shipAfter(i,j,mtr,unChecked);
                    if(shipBelow.cells.length > shipAtTheRight.cells.length)
                        ships.push(shipBelow);
                    else
                        ships.push(shipAtTheRight);
                }
            }
        }
    return ships;
}

shipUnder=(i,j,mtr,unChecked)=>{
    let ship=new Ship();
    for (let k = parseInt(j); (k < 10 && mtr[i][k]); k++){
        unChecked[i][k] = false;
        ship.cells.push(new Cell(parseInt(i),k));
    }
    return ship;
}

shipAfter=(i,j,mtr,unChecked)=>{
    let ship=new Ship();
    for (let k = parseInt(i); (k < 10 && mtr[k][j]); k++){
        unChecked[k][j] = false;
        ship.cells.push(new Cell(k,parseInt(j)));
    }
    return ship;
}

function clickBeginGame(){
    gameState=1;
    //убрали кнопку play
    let btn = document.getElementsByClassName('btn__begin-game');
    btn[0].style.visibility = "hidden";
    //поменять h1
    let h1 = document.getElementById('h1');
    h1.innerText='Ударьте по вражеской армаде!';
    //отключили отклик на поле игрока
    removeOnClick();
    //нарисовали вражеское поле
    drawOpponentField();
    //запустили listener на игру
    addGameListener();

}

function addGameListener(){
    let list = document.getElementsByClassName('cell-hover');
    console.log(list);
    for(let i=0; i<nn; i++){
        list[i].addEventListener( "click" , clickOpponentCell);
    }
}
function clickOpponentCell(){
    console.log('id of cell(ClickCell): '+this.id);
    let i=parseInt(this.id[this.id.length-2]);
    let j=parseInt(this.id[this.id.length-1]);

    let cell = new Cell(i,j,0); //0- нулевой нейтральный статус, когда мы бьем по пустой ячейке предполагается, что она 0
    $.ajax({
        url: '/userHitServlet',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(cell),
        success: function (data) {
            console.log(data);
            if(analiseData(data)==='cell'){

                if (data.state ===2 ){//мы ранили ячейку
                    // проверяем у ячеек статус onclick и если его нет добавляем его, чтобы пользователь мог стрелять еще
                    if (checkOnClickCellsStatus('opponent-playing-field_cell')===false){
                        setOnClick('opponent-playing-field_cell');
                    }
                    //выводим сообщение "вы попали" стреляйте еще
                    changeH1('Вы попали, стреляйте еще!');
                }
                else if (data.state===1) {
                    //мы не ранили ячейку
                    //блокируем у ячеек статус onclick
                    removeOnClick();
                    //запускаем функцию которая обрабатывает стрельбу компьютера
                    getServerHit();
                }
            }
            else if (analiseData(data)==='ship'){

            }
           /* else if (analiseData(data)==='string'){
               запускаем только если будем присылать строку
            }*/
        },
        error:function () {
            
        }
    });

    /*hitBy('opponent-playing-field', i,j); //мимо
    hurt('opponent-plaing-field', i, j ); // ранен
    killed('opponent-playing-field', i, j)//убит
    */

    //и один из следующих методов для поля игрока
    /*hitBy('my-playing-field', i,j); //мимо
    hurt('my-plaing-field', i, j ); // ранен
    killed('my-playing-field', i, j)//убит
    */
}
function setMyShipCellsStatus() {
    console.log('setNullStatus to All Ships');
    for (let ship in myShips){
        for (let cell in myShips[ship].cells){
            myShips[ship].cells[cell].state = '4';//мой корабль, в него еще не стреляли
        }
    }
    console.log(myShips);
}

function testFunction(){
    analiseData(myShips[2]);
    CheckOurSellForHurting(0,0);
}

//функция проверки корабль это или ячейка
function analiseData(data) {
    console.log('aniliseData');
    if(data.cells === undefined){
        //значит это не корабль
        if(data.state ===undefined){
            //значит это строка
            console.log('string');
            return 'string';
        }
        else {
            console.log('cell');
            return 'cell';
        }
    }
    else{
        console.log('ship');
        return 'ship';
    }
}

//проверяет есть ли у ячеек (противника или свои) в зависимости от classname класс "cell-hover" отвечающий за событие onclick
function checkOnClickCellsStatus(className) {
    console.log('checkOnClickCellsStatus');
    let cells = document.getElementsByClassName(className);
    if (hasClass(cells[0],`cell-hover`)){
        return true;
    }
    else return false;
}

//определяет есть ли класс у элемента
function hasClass(element, className) {
    console.log('hasClass');
    let rx = new RegExp('(?:^| )' + className + '(?: |$)');
    return rx.test(element.className);
}

//функция обрабатывающая удары сервера
function getServerHit(){
    //посылаем get запрос чтобы сервер вернул нам ячейку в которую он будет атаковать
    $.ajax({
        url: "/userHitServlet",
        type: "get",
        success: function(data){
            //нам прислали ячейку
            //запускаем функцию проверки попал он или нет
            if (CheckOurSellForHurting(0,0)==='hitby'){
                //отправляем post запрос с информацией о том, что он попал мимо
                //помечаем на поле пустую ячейку
                //разблокировка события click на ячейках
                //вывод сообщения:"Ваша очередь";
            }
            else if(CheckOurSellForHurting(0,0)==='hurt'){
                //сервер ранил
                //отправляем пост запрос что сервер ранил в ячейку
                //вызываем опять нашу функцию
                //подкрашиваем на пользовательском поле горящий корабль
            }
            else if (CheckOurSellForHurting(0,0)==='kill'){
                
            }
        },
        error: function(xhr) {
        }
    });
}

//функция проверки попали по нашим кораблям или нет
function CheckOurSellForHurting(x,y) {//должно быть hit
    console.log('CheckOurSellForHurting');
    for (let ship in myShips){
        for (let cell in myShips[ship].cells){
            //если среди наших кораблей есть такая ячейка(попали)
            if((myShips[ship].cells[cell].x ===x)&&(myShips[ship].cells[cell].y===y)){ //должно быть hit.x
                console.log('попали');
                //проверка убит или ранен
                if (HurtOrKill(myShips[ship], myShips[ship].cells[cell])){
                    killShip(myShips[ship]);
                    console.log('return kill');
                    return 'kill';
                }
                else {
                    myShips[ship].cells[cell].state = 2;
                    hurtCell( myShips[ship].cells[cell]);
                    console.log('return hurt');
                    return 'hurt';
                }
            }
        }
    }
    //пометить у себя что компьютер по этой ячейке уже стрелял
    console.log('return hitby');
    return 'hitby';

}
//проверка ранена ячейка в корабле пользователя или убита
function HurtOrKill(ship) {
    console.log('HurtOrKill');
    let length = ship.cells.length;
    for (let cell in ship.cells){
        if (ship.cells[cell].state===2){//если в нашем корабле ячейка ранена, то
            length--;
        }
    }
    if (length===1){//осталась только одна живая ячейка
        console.log('осталась только одна живая ячейка, в нее попали и корабль убит');
        return true;
    }
    else {
        console.log('ячейка ранена');
        return false;
    }
}

//метод который убивает все ячейки у корабля (меняет на статус 3)
function killShip(ship) { 
    console.log('killShip');
    //метод который рисует убитый корабль
    for (let cell in ship.cells){
        ship.cells[cell].state=3;
    }
    //отправляем корабль ship
    //getServerHit();
}

function hurtCell() {
}