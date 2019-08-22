import { loadScript } from './dom.js'
import { randomSeed, repeat } from './math.js'
import { timeoutLoop } from './async.js'

function toJSON(obj, indent = 0, topLevelArrayOK = true) {
    let firstCall = topLevelArrayOK
    const blackList = ['rectCache']
    const json = JSON.stringify(
        obj,
        (key, val) => {
            if (blackList.includes(key)) return undefined
            const isAgentArray =
                Array.isArray(val) &&
                val.length > 0 &&
                Number.isInteger(val[0].id)

            if (isAgentArray && !firstCall) {
                return val.map(v => v.id)
            }

            firstCall = false
            return val
        },
        indent
    )
    return json
}

export function sampleModel(model) {
    const obj = {
        model: Object.keys(model),
        patches: model.patches.length,
        patch: model.patches.oneOf(),
        turtles: model.turtles.length,
        turtle: model.turtles.oneOf(),
        links: model.links.length,
        link: model.links.oneOf(),
    }
    const json = toJSON(obj)
    return JSON.parse(json)
}

export function inWorker() {
    return self.window === undefined
}

// params; classPath, steps, seed,
export async function runModel(params) {
    // fails in test/models.js: Cannot access 'inWorker' before initialization
    // const inWorker = inWorker() // fails in test/models.js
    const inWorker = self.window === undefined
    const prefix = inWorker ? 'worker ' : 'main '
    console.log(prefix + 'params', params)

    if (inWorker) importScripts(params.classPath)
    else await loadScript(params.classPath)

    if (params.seed) randomSeed()

    // const Model = eval(params.className)
    const model = new defaultModel()
    console.log(prefix + 'model', model)

    await model.startup()
    model.setup()
    if (inWorker) {
        repeat(params.steps, () => {
            model.step()
            model.tick()
        })
    } else {
        await timeoutLoop(() => {
            model.step()
            model.tick()
        }, params.steps)
    }
    console.log(prefix + 'done, model', model)

    return sampleModel(model)
}
