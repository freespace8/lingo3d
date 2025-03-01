import { SpriteMaterial } from "three"
import renderSystemWithData from "./utils/renderSystemWithData"

export const [addSpriteSheetPlaySystem, deleteSpriteSheetPlaySystem] =
    renderSystemWithData(
        (
            material: SpriteMaterial,
            data: {
                x: number
                y: number
                columns: number
                rows: number
                frame: number
                length: number
                loop: boolean | undefined
            }
        ) => {
            material.map!.offset.set(data.x / data.columns, data.y / data.rows)
            if (++data.x === data.columns) {
                data.x = 0
                --data.y
            }
            if (++data.frame < data.length) return
            data.frame = 0
            data.x = 0
            data.y = data.rows - 1
            !data.loop && deleteSpriteSheetPlaySystem(material)
        }
    )
