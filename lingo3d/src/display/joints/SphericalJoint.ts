import ISphericalJoint, {
    sphericalJointDefaults,
    sphericalJointSchema
} from "../../interface/ISphericalJoint"
import { addConfigSphericalJointSystem } from "../../systems/configSystems/configSphericalJointSystem"
import JointBase from "../core/JointBase"
import PhysicsObjectManager from "../core/PhysicsObjectManager"
import { physxPtr } from "../../pointers/physxPtr"

const createSpherical = (actor0: any, pose0: any, actor1: any, pose1: any) => {
    const { physics, Px } = physxPtr[0]
    return Px.SphericalJointCreate(physics, actor0, pose0, actor1, pose1)
}

export default class SphericalJoint
    extends JointBase
    implements ISphericalJoint
{
    public static componentName = "sphericalJoint"
    public static defaults = sphericalJointDefaults
    public static schema = sphericalJointSchema

    public $createJoint(
        fromPxTransform: any,
        toPxTransform: any,
        fromManager: PhysicsObjectManager,
        toManager: PhysicsObjectManager
    ) {
        addConfigSphericalJointSystem(this)
        return createSpherical(
            fromManager.$actor,
            fromPxTransform,
            toManager.$actor,
            toPxTransform
        )
    }

    private _limited?: boolean
    public get limited() {
        return this._limited ?? false
    }
    public set limited(val) {
        this._limited = val
        addConfigSphericalJointSystem(this)
    }

    private _limitY?: number
    public get limitY() {
        return this._limitY ?? 360
    }
    public set limitY(val) {
        this._limitY = val
        addConfigSphericalJointSystem(this)
    }

    private _limitZ?: number
    public get limitZ() {
        return this._limitZ ?? 360
    }
    public set limitZ(val) {
        this._limitZ = val
        addConfigSphericalJointSystem(this)
    }
}
