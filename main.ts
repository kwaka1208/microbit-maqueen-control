function 左回転 () {
    maqueen.motorStop(maqueen.Motors.M1)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
}
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (receivedNumber == 1) {
        前進()
    } else if (receivedNumber == 2) {
        後退()
    } else if (receivedNumber == 5) {
        左回転()
    } else if (receivedNumber == 9) {
        右回転()
    } else {
        停止()
    }
})
function 後退 () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 50)
}
function 前進 () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 50)
}
function 右回転 () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
    maqueen.motorStop(maqueen.Motors.M2)
}
function 停止 () {
    maqueen.motorStop(maqueen.Motors.All)
}
let コントロール = 0
radio.setGroup(128)
let 前の値 = 0
basic.forever(function () {
    コントロール = 0
    if (input.rotation(Rotation.Pitch) < -30) {
        コントロール += 1
    }
    if (input.rotation(Rotation.Pitch) > 30) {
        コントロール += 2
    }
    if (input.rotation(Rotation.Roll) < -60) {
        コントロール += 4
    }
    if (input.rotation(Rotation.Roll) > 60) {
        コントロール += 8
    }
    if (コントロール != 前の値) {
        前の値 = コントロール
        basic.showNumber(コントロール)
        radio.sendNumber(コントロール)
    }
})
