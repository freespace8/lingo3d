import { createEffect } from "@lincode/reactivity"
import { filterBoolean } from "@lincode/utils"
import { EffectComposer, EffectPass, RenderPass } from "postprocessing"
import { getCameraRendered } from "../../../states/useCameraRendered"
import { getRenderer } from "../../../states/useRenderer"
import { getResolution } from "../../../states/useResolution"
import scene from "../../scene"
import { getBloomEffect } from "./bloomEffect"
import { getBokehEffect } from "./bokehEffect"
import { getNormalPass } from "./normalPass"
import { getOutlineEffect } from "./outlineEffect"
import { getSelectiveBloomEffect } from "./selectiveBloomEffect"
import { getSSAOEffect } from "./ssaoEffect"
import { getSSREffect } from "./ssrEffect"
import { getVignetteEffect } from "./vignetteEffect"
import { cameraRenderedPtr } from "../../../pointers/cameraRenderedPtr"
import { resolutionPtr } from "../../../pointers/resolutionPtr"

const effectComposer = new EffectComposer()
getRenderer((renderer) => renderer && effectComposer.setRenderer(renderer))
export default effectComposer

effectComposer.multisampling = 4

createEffect(() => {
    const renderPass = new RenderPass(scene, cameraRenderedPtr[0])
    effectComposer.addPass(renderPass, 0)
    return () => {
        effectComposer.removePass(renderPass)
        renderPass.dispose()
    }
}, [getCameraRendered])

createEffect(() => {
    const [[w, h]] = resolutionPtr
    effectComposer.setSize(w, h)
}, [getRenderer, getResolution])

createEffect(() => {
    const normalPass = getNormalPass()
    normalPass && effectComposer.addPass(normalPass)

    const effectPass = new EffectPass(
        cameraRenderedPtr[0],
        ...[
            getBloomEffect(),
            getSelectiveBloomEffect(),
            getSSREffect(),
            getSSAOEffect(),
            getOutlineEffect(),
            getBokehEffect(),
            getVignetteEffect()
        ].filter(filterBoolean)
    )
    effectComposer.addPass(effectPass)

    return () => {
        effectComposer.removePass(effectPass)
        normalPass && effectComposer.removePass(normalPass)
        effectPass.dispose()
    }
}, [
    getCameraRendered,
    getRenderer,
    getBloomEffect,
    getSelectiveBloomEffect,
    getSSREffect,
    getSSAOEffect,
    getOutlineEffect,
    getBokehEffect,
    getVignetteEffect,
    getNormalPass
])
