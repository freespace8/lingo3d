import { deg2Rad } from "@lincode/math"
import PhysicsObjectManager from "../../display/core/PhysicsObjectManager"
import { physxPtr } from "../../pointers/physxPtr"
import { assignPxTransform } from "../../engine/physx/pxMath"
import getActualScale from "../../memo/getActualScale"
import scene from "../../engine/scene"
import {
    actorPtrManagerMap,
    controllerManagerMap,
    managerActorMap,
    managerControllerMap
} from "../../collections/pxCollections"
import { lazy } from "@lincode/utils"
import {
    increaseLoadingUnpkgCount,
    decreaseLoadingUnpkgCount
} from "../../states/useLoadingUnpkgCount"
import { getPhysXLoaded } from "../../states/usePhysXLoaded"
import { physicsSet } from "../../collections/physicsSet"
import configSystemWithCleanUp2 from "../utils/configSystemWithCleanUp2"

export const importPhysX = lazy(async () => {
    increaseLoadingUnpkgCount()
    await import("../../engine/physx")
    await new Promise<void>((resolve) =>
        getPhysXLoaded((loaded, handle) => {
            if (!loaded) return
            handle.cancel()
            resolve()
        })
    )
    decreaseLoadingUnpkgCount()
})

export const [addConfigPhysicsShapeSystem] = configSystemWithCleanUp2(
    (self: PhysicsObjectManager) => {
        const mode = self.physics || !!self.$jointCount
        if (!mode) return false

        physicsSet.add(self)

        const {
            physics,
            pxScene,
            PxCapsuleControllerDesc,
            PxCapsuleClimbingModeEnum,
            PxControllerNonWalkableModeEnum,
            material,
            getPxControllerManager,
            controllerHitCallback,
            destroy
        } = physxPtr[0]

        const ogParent = self.outerObject3d.parent
        ogParent !== scene && scene.attach(self.outerObject3d)

        if (mode === "character") {
            const desc = new PxCapsuleControllerDesc()
            const { x, y } = getActualScale(self).multiplyScalar(0.5)
            self.$capsuleHeight = y * 2
            desc.height = y * 1.2
            desc.radius = x
            Object.assign(desc.position, self.position)
            desc.climbingMode = PxCapsuleClimbingModeEnum.eEASY()
            desc.nonWalkableMode =
                PxControllerNonWalkableModeEnum.ePREVENT_CLIMBING()
            desc.slopeLimit = Math.cos(45 * deg2Rad)
            desc.material = material
            desc.contactOffset = 0.1
            // desc.stepOffset = y * 0.4
            // desc.maxJumpHeight = 0.1

            desc.reportCallback = controllerHitCallback
            // desc.behaviorCallback = behaviorCallback.callback
            const controller = (self.$controller =
                getPxControllerManager().createController(desc))
            destroy(desc)

            self.$initActor(controller.getActor())
            managerControllerMap.set(self, controller)
            controllerManagerMap.set(controller, self)
            return
        }
        const pxTransform = assignPxTransform(self)
        const isStatic = mode === "map" || mode === "static"
        const actor = self.$initActor(
            isStatic
                ? physics.createRigidStatic(pxTransform)
                : physics.createRigidDynamic(pxTransform)
        )
        self.$getPxShape(mode, actor)
        pxScene.addActor(actor)
        managerActorMap.set(self, actor)
    },
    (self) => {
        if (self.$controller) {
            physicsSet.delete(self)
            actorPtrManagerMap.delete(self.$actor.ptr)
            physxPtr[0].destroy(self.$controller)
            managerControllerMap.delete(self)
            self.$actor = undefined
            self.$controller = undefined
            return
        }
        physicsSet.delete(self)
        physxPtr[0].pxScene.removeActor(self.$actor)
        physxPtr[0].destroy(self.$actor)
        actorPtrManagerMap.delete(self.$actor.ptr)
        managerActorMap.delete(self)
        self.$actor = undefined
    },
    [importPhysX]
)
