import Model from "../display/Model"
import mathFn from "../math/mathFn"
import loadJSON from "../display/utils/loaders/loadJSON"
import deserialize from "../api/serializer/deserialize"
import { getAppendablesById } from "../collections/idCollections"
import { ThirdPersonCamera, PointLight, onBeforeRender } from ".."
import HandTracker from "../display/HandTracker"
import { mapRange } from "@lincode/math"
import { getWorldPlay } from "../states/useWorldPlay"
import { getWorldPlayComputed } from "../states/useWorldPlayComputed"

const data: any = await loadJSON("car/bentley2.json")
deserialize(data)

const [found] = getAppendablesById("car")
const model = found as Model

// const light = new PointLight()
// light.x = 0
// light.y = 50
// light.z = 0
// light.helper = false
// light.castShadow = true

const handTracker = new HandTracker()
handTracker.x = 150
handTracker.y = 100

model.onLoad = () => {
    const handle = getWorldPlayComputed((play) => {
        if (play) {
            handle.cancel()
            handTracker.track = true
        }
    })

    const cam = new ThirdPersonCamera()
    cam.innerZ = 500
    cam.polarAngle = 100

    let gestureOld = ""
    let gesture = ""
    onBeforeRender(() => {
        if (
            gestureOld !== handTracker.gesture &&
            handTracker.gesture !== "None"
        ) {
            gesture = handTracker.gesture
            if (gesture === "Closed_Fist") {
                ;(async () => {
                    for (const part of getAppendablesById("exp") as any) {
                        const direction = mathFn.normalize(part.getCenter())
                        direction.x = direction.x * mathFn.randomRange(0.5, 1.5)
                        direction.y = direction.y * mathFn.randomRange(1.5, 2)
                        direction.z = direction.z * mathFn.randomRange(0.5, 1.5)
                        if (part.name === "Object_74") {
                            direction.x = 0
                            direction.y = 0
                            direction.z = -4
                        } else if (part.name === "Object_10") direction.y = 2
                        const { x, y, z } = mathFn.multiply(direction, 50)
                        part.lerpTo(x, y, z)
                        await new Promise<void>((resolve) =>
                            setTimeout(resolve, 10)
                        )
                    }
                })()
            } else if (gesture === "Open_Palm") {
                ;(async () => {
                    for (const part of getAppendablesById("exp") as any) {
                        part.lerpTo(0, 0, 0)
                        await new Promise<void>((resolve) =>
                            setTimeout(resolve, 10)
                        )
                    }
                })()
            }
        }
        if (gesture === "Closed_Fist" || gesture === "Open_Palm") {
            cam.gyrate(mapRange(handTracker.rotationY, -70, -80, -1, 1), 0)
        }
        gestureOld = handTracker.gesture
    })
}
