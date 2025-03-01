import { addConfigPhysicsShapeSystem } from "../configSystems/configPhysicsShapeSystem"
import { addConfigPhysicsTransformSystem } from "../configSystems/configPhysicsTransformSystem"
import configLoadedSystem from "../utils/configLoadedSystem"

export const [addConfigPhysicsSystem] = configLoadedSystem((self) => {
    if (!("physics" in self)) return

    const mode = self.physics || !!self.$jointCount
    let modeChanged = mode !== self.userData.physicsMode
    if (modeChanged && !mode && !self.userData.physicsMode) modeChanged = false
    self.userData.physicsMode = mode

    if (modeChanged) addConfigPhysicsShapeSystem(self)
    else if (self.$actor) addConfigPhysicsTransformSystem(self)
})
