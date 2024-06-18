import { mCurrPoint, mDX, mDY, mDWhl } from "./aboutMouse.js";

let pos = { x : 0, y : 0, z : 0 };
let rot = 0.0;

let mBoxRotating = false;
let mCurrDelay = 0;
let mPrgs = 0;

let rBoxRotating = false;
let rCurrDelay = 0;
let rPrgs = 0;

let boxDefPos = [ 0, 0, -6 ];
let boxExpPos = [ 0, 0, -9 ];
let boxCurrPos = boxDefPos;

let boxDefPos1 = { x : 0, y : 0, z : -6 };
let boxExpPos1 = { x : 0, y : 0, z : -9 };
let boxCurrPos1 = boxDefPos;

function boxZoomAndOut(box) {
    if (mDWhl > 0) {
        //boxCurrPos = boxDefPos;
        if (boxCurrPos1.x != boxDefPos1.x && boxCurrPos1.y != boxDefPos1.y && boxCurrPos1.z != boxDefPos1.z) {
            boxCurrPos1 = moveSlowly(boxCurrPos1, boxDefPos1);
        }
    }
    if (mDWhl < 0) {
        //boxCurrPos = boxExpPos;
        if (boxCurrPos1.x != boxExpPos1.x && boxCurrPos1.y != boxExpPos1.y && boxCurrPos1.z != boxExpPos1.z) {
            boxCurrPos1 = moveSlowly(boxCurrPos1, boxExpPos1);
        }
    }
    box.pos = boxCurrPos;
}

function moveSlowly(dest, src, delay) {
    let mDx = (dest.x - src.x) / mCurrDelay;
    let mDy = (dest.y - src.y) / mCurrDelay;
    let mDz = (dest.z - src.z) / mCurrDelay;

    if (mBoxRotating == false) {
        mCurrDelay = delay;
    }

    if (mBoxRotating == true) {
        pos.x += mDx;
        pos.y += mDy;
        pos.z += mDz;
        
        mPrgs += 1;
        if (mPrgs >= mCurrDelay) {
            mBoxRotating = false;
            mCurrDelay = 0;
            mPrgs = 0;
            pos = [ 0, 0, 0 ];
        }
    }

    return pos;
}

function rotateSlowly(dest, src, delay) {
    let mDr = (dest - src) / rCurrDelay;

    if (rBoxRotating == false) {
        rCurrDelay = delay;
    }

    if (rBoxRotating == true) {
        rot += mDr;

        rPrgs += 1;
        if (rPrgs >= rCurrDelay) {
            rBoxRotating = false;
            rCurrDelay = 0;
            rPrgs = 0;
            rot = 0;
        }
    }

    return rot;
}

export { boxZoomAndOut };

