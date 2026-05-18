"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = express_1.default.Router();
router.get("/profile", auth_middleware_1.protect, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user,
    });
});
router.get("/admin", auth_middleware_1.protect, (0, role_middleware_1.authorizeRoles)("admin"), (req, res) => {
    res.json({
        message: "Welcome Admin",
    });
});
exports.default = router;
