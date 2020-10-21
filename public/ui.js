
console.log('ui check')

let wHeight = $(window).height();
let wWidth = $(window).width();
let player = {};
let orbs = [];
let players =[];

//create canvas
let canvas = document.querySelector('#the-canvas');
let context =  canvas.getContext('2d');
canvas.width = wWidth;
canvas.height= wHeight;

$(window).load(()=>{
    $('#loginModal').modal('show');

})
$('.name-form').submit((e)=>{
    e.preventDefault();
    player.name = document.querySelector("#name-input").value;
    console.log('player enrolled', player);
    $('#loginModal').modal('hide');
    $('#spawnModal').modal('show');
    document.querySelector('.player-name').innerHTML = player.name;
});

$('.start-game').click((event)=>{
    $('.modal').modal('hide');
    $('.hiddenOnStart').removeAttr('hidden');
    init();

});