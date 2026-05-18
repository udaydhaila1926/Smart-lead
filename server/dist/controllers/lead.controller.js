"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getSingleLead = exports.getLeads = exports.createLead = void 0;
const Lead_model_1 = __importDefault(require("../models/Lead.model"));
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const lead = yield Lead_model_1.default.create(Object.assign(Object.assign({}, req.body), { createdBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
        res.status(201).json({
            message: "Lead created successfully",
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.createLead = createLead;
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, source, search, sort = "latest", page = "1", } = req.query;
        const query = {};
        // Filter by status
        if (status) {
            query.status = status;
        }
        // Filter by source
        if (source) {
            query.source = source;
        }
        // Search by name or email
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        // Pagination
        const limit = 10;
        const currentPage = Number(page);
        const skip = (currentPage - 1) * limit;
        // Sorting
        const sortOption = sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };
        // Total leads
        const totalLeads = yield Lead_model_1.default.countDocuments(query);
        // Fetch leads
        const leads = yield Lead_model_1.default.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        res.status(200).json({
            success: true,
            currentPage,
            totalPages: Math.ceil(totalLeads / limit),
            totalLeads,
            leads,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.getLeads = getLeads;
const getSingleLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_model_1.default.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        res.status(200).json({
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.getSingleLead = getSingleLead;
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        res.status(200).json({
            message: "Lead updated",
            lead,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_model_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }
        res.status(200).json({
            message: "Lead deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
});
exports.deleteLead = deleteLead;
