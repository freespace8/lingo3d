import {
    Sphere,
    SpotLightHelper,
    PointLight as ThreePointLight,
    SpotLight as ThreeSpotLight
} from "three"
import { CM2M, M2CM } from "../../globals"
import IPointLightBase from "../../interface/IPointLightBase"
import LightBase from "./LightBase"
import {
    addLightIntensitySystem,
    deleteLightIntensitySystem
} from "../../systems/lightIntensitySystem"
import {
    addUpdateShadowSystem,
    deleteUpdateShadowSystem
} from "../../systems/updateShadowSystem"
import { releaseShadowRenderTarget } from "../../pools/objectPools/shadowRenderTargetPool"
import { shadowModePtr } from "../../pointers/shadowModePtr"
import Cube from "../primitives/Cube"
import unsafeSetValue from "../../utils/unsafeSetValue"

export default abstract class PointLightBase<
        T extends ThreePointLight | ThreeSpotLight = ThreePointLight
    >
    extends LightBase<T>
    implements IPointLightBase
{
    public constructor(light: T, helper?: typeof SpotLightHelper) {
        super(light, helper)
        light.shadow.autoUpdate = false
        this.distance = 500
        this.intensity = 10
        this.shadows = true
    }

    protected override disposeNode() {
        releaseShadowRenderTarget(this.object3d.shadow.map)
        unsafeSetValue(this.object3d.shadow, "map", null)
        super.disposeNode()
    }

    private renderCheckBox?: Cube
    public get isRendered() {
        if (!this.renderCheckBox) {
            const renderCheckBox = (this.renderCheckBox = new Cube())
            renderCheckBox.$ghost()
            renderCheckBox.opacity = 0.001
            this.append(renderCheckBox)
        }
        return this.renderCheckBox.isRendered
    }

    public $boundingSphere = new Sphere()
    public get distance() {
        return this.object3d.distance * M2CM
    }
    public set distance(val) {
        this.object3d.distance = val * CM2M
    }

    public get shadows() {
        return this.object3d.castShadow
    }
    public set shadows(val) {
        this.object3d.castShadow = val
        val
            ? addUpdateShadowSystem(this, {
                  count: undefined,
                  shadowMode: shadowModePtr[0]
              })
            : deleteUpdateShadowSystem(this)
    }

    private _intensity = 1
    public override get intensity() {
        return this._intensity
    }
    public override set intensity(val) {
        this._intensity = val
        if (!this._fade) this.object3d.intensity = val
    }

    private _fade = false
    public get fade() {
        return this._fade
    }
    public set fade(val) {
        this._fade = val
        if (val) {
            addLightIntensitySystem(this)
            return
        }
        deleteLightIntensitySystem(this)
        this.intensity = this._intensity
    }
}
