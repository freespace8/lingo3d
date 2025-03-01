import { createEffect, store } from "@lincode/reactivity"
import mainCamera from "../engine/mainCamera"
import { getCameraRendered } from "./useCameraRendered"
import { getEditorBehavior } from "./useEditorBehavior"
import { getWorldPlayComputed } from "./useWorldPlayComputed"
import { cameraRenderedPtr } from "../pointers/cameraRenderedPtr"
import { editorBehaviorPtr } from "../pointers/editorBehaviorPtr"

const [setEditorHelper, getEditorHelper] = store(false)
export { getEditorHelper }

createEffect(() => {
    setEditorHelper(
        editorBehaviorPtr[0] &&
            !getWorldPlayComputed() &&
            cameraRenderedPtr[0] === mainCamera
    )
}, [getEditorBehavior, getCameraRendered, getWorldPlayComputed])
