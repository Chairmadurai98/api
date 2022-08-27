import express from "express"
const router = express.Router()
import Building from "../schema/BuildingSchema.js"
import Campus from "../schema/CampusSchema.js"




//add Building
router.post("/add/:id", async (req, res) => {
    try {
        const campus = await Campus.findById(req.params.id)
        if (!campus) {
            return res.status(404).json("Campus Id not Found or Duplicate Building Name")
        }
        else {
            const id = req.params._id
            const build = new Building({
                buildingName: req.body.buildingName,
                _campusId: req.params.id
            })
            const savedData = await build.save()
            const camp = await Campus.findByIdAndUpdate(req.params.id, {
                $addToSet: { buildings: savedData._id }
            }, { new: true })
            return res.status(200).json("SuccessFully Add Building")

        }

    } catch (error) {
        return res.status(500).json(error)
    }
})




//Delete Buildings

router.delete("/delete/:id", async (req, res) => {
    try {

        const data = await Building.findById(req.params.id)
        const build = await Building.findByIdAndDelete(req.params.id)
        if (!build) {
            return res.status(404).json("Not Found")
        }
        else {
            const id = data._campusId
            const buid = data._id
            await Campus.findByIdAndUpdate(id, {
                $pull: { buildings: buid }
            }, { new: true })
            return res.status(200).json("SuccessFully Deleted Campus")
        }


    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
    const build = await Building.find()
    if (build) return res.status(200).json(build)
    return res.status(400).json("Something Wrong")
})



router.put("/update/:id", async (req, res) => {
    try {
        await Building.findByIdAndUpdate(req.params.id, { $set: { buildingName: req.body.buildingName, status: req.body.status } })
        return res.status(200).json("Updated Sucessfully")
    } catch (error) {
        return res.status(500).json(error)
    }
})


















export default router