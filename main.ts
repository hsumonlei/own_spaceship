namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . 2 1 1 1 2 . . . . . 
        . . . . . . 2 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.spray, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.showLongText("Lack of Fuel", DialogLayout.Center)
    game.over(false, effects.confetti)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.spray, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let asteroid: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.splash("\"Welcome Our Spaceship\"")
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 3 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 3 . . . . . . . 
    . . . . . . 8 8 1 a . . . . . . 
    . . . . . . 8 3 1 a . . . . . . 
    . . . . . c c c a a a . . . . . 
    . . . . 8 8 3 3 3 1 a a . . . . 
    . . 8 f f f c c a a f f a a . . 
    . 8 8 8 8 a a 3 3 3 3 1 3 a a . 
    8 8 8 8 8 8 a a 3 3 3 1 3 3 a a 
    8 8 8 8 8 8 a a 3 3 3 3 1 3 a a 
    `, SpriteKind.Player)
mySprite.setPosition(77, 67)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -20, 0)
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(img`
        .............beebbbb............
        ............eebbbb4bb...........
        ............eb344bb4bb..........
        ............e44334bb4bb.........
        ............eb433344b4be........
        ............4eb43344444be.......
        ...........bd4eb43333344bb......
        ..........b455d4443333444bb.....
        ..........4d5555d444333444bb....
        .........4555555dd4b4443444be...
        ........bd5555d555d4bb444444ee..
        ........b55ddd665555bb4b44444ee.
        .......bd5555677655554ebb44444eb
        .......43222558855555d4eeb44b4ee
        ......b422332ddd555222d4eebbb4be
        ......be22232ed55522332db4ebbbbe
        .....bde22222e555e22232edd4bbbbe
        .....b52e222e3555e22222eddd4ebee
        ....bd552eee355552e222e355544eee
        ....665dd5555555552eee355dd4deee
        ...6776555555555555555551554d4ee
        ...4885222555dddd6655551544d4eee
        ..b45522332555dd677611d444ddeee.
        ..4d5222232e55555881d44ddd4eee..
        .bdd5e22222e555115114d54d4ee....
        .b55d2e222e351144d1d55eeee......
        bd5ddd2eee3d444555dd4e..........
        b555115dddd55d544eede...........
        4511d444d5544ee...4de...........
        41d4555d4ee........44...........
        41554eede.......................
        44ee...4e.......................
        `, 0, 50)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(1000, function () {
    asteroid = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c c c . . . . . . 
        . . . . . . a b a a . . . . . . 
        . . . . . c b a f c a c . . . . 
        . . . . c b b b f f a c c . . . 
        . . . . b b f a b b a a c . . . 
        . . . . c b f f b a f c a . . . 
        . . . . . c a a c b b a . . . . 
        . . . . . . c c c c . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 50)
    asteroid.x = randint(0, scene.screenWidth())
    asteroid.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(200, function () {
    statusbar.value += -1
})
