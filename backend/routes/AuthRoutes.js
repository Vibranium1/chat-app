const { Signup, Login, Chats} = require("../controllers/AuthControllers");
const router = require("express").Router();
const {userVerification} = require("../middlewares/AuthMiddlewares")

router.post("/signup", Signup);
router.post("/login",Login);
router.post('/',userVerification);

router.get("/chats",Chats);


module.exports = router;