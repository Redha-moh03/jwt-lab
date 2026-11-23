const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const entryController = require('../controllers/entry.controller')

router.post('/', verifyToken, entryController.createEntry)

router.get('/', entryController.getAllPublicEntries)

router.get('/my-entries', verifyToken, entryController.myEntries)

router.put('/:entryId', verifyToken, entryController.editEntry)

router.delete('/:entryId', verifyToken, entryController.deleteEntry)
module.exports = router;
