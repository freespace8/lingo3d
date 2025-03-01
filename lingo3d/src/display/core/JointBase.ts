import { Vector3, Quaternion } from "three"
import IJointBase from "../../interface/IJointBase"
import { getEditorBehavior } from "../../states/useEditorBehavior"
import { getEditorHelper } from "../../states/useEditorHelper"
import { flushMultipleSelectionTargets } from "../../states/useMultipleSelectionTargets"
import { getWorldPlayComputed } from "../../states/useWorldPlayComputed"
import PhysicsObjectManager from "./PhysicsObjectManager"
import HelperSphere from "./utils/HelperSphere"
import { addConfigPhysicsSystem } from "../../systems/configLoadedSystems/configPhysicsSystem"
import { jointSet } from "../../collections/jointSet"
import MeshAppendable from "./MeshAppendable"
import { addConfigJointSystem } from "../../systems/configSystems/configJointSystem"
import { editorBehaviorPtr } from "../../pointers/editorBehaviorPtr"

export default abstract class JointBase
    extends MeshAppendable
    implements IJointBase
{
    public $fromManager?: PhysicsObjectManager
    public $toManager?: PhysicsObjectManager

    public abstract $createJoint(
        fromPxTransfrom: any,
        toPxTransform: any,
        fromManager: PhysicsObjectManager,
        toManager: PhysicsObjectManager
    ): any

    public $pxJoint: any

    protected override disposeNode() {
        super.disposeNode()
        jointSet.delete(this)
    }

    public constructor() {
        super()
        jointSet.add(this)

        this.createEffect(() => {
            if (!getWorldPlayComputed() || !editorBehaviorPtr[0]) return
            flushMultipleSelectionTargets(() => this.savePos())
            return () => {
                flushMultipleSelectionTargets(() => this.restorePos())
            }
        }, [getWorldPlayComputed, getEditorBehavior])

        this.createEffect(() => {
            if (!getEditorHelper() || this.$disableSceneGraph) return

            const helper = new HelperSphere(this)
            helper.scale = 0.1
            helper.depthTest = false

            return () => {
                helper.dispose()
            }
        }, [getEditorHelper])
    }

    private fromPos: Vector3 | undefined
    private toPos: Vector3 | undefined
    private fromQuat: Quaternion | undefined
    private toQuat: Quaternion | undefined

    private savePos() {
        const { $fromManager: fromManager, $toManager: toManager } = this
        if (!fromManager || !toManager) return

        this.fromPos = fromManager.position.clone()
        this.toPos = toManager.position.clone()
        this.fromQuat = fromManager.quaternion.clone()
        this.toQuat = toManager.quaternion.clone()
    }
    private restorePos() {
        const { $fromManager: fromManager, $toManager: toManager } = this
        if (!fromManager || !toManager) return

        this.fromPos && fromManager.position.copy(this.fromPos)
        this.toPos && toManager.position.copy(this.toPos)
        this.fromQuat && fromManager.quaternion.copy(this.fromQuat)
        this.toQuat && toManager.quaternion.copy(this.toQuat)

        addConfigJointSystem(this)
        addConfigPhysicsSystem(fromManager)
        addConfigPhysicsSystem(toManager)
    }

    private _to?: string
    public get to() {
        return this._to
    }
    public set to(val) {
        this._to = val
        addConfigJointSystem(this)
    }

    private _from?: string
    public get from() {
        return this._from
    }
    public set from(val) {
        this._from = val
        addConfigJointSystem(this)
    }
}
