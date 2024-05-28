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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api.error"));
const coupon_models_1 = require("./coupon.models");
const pagination_helper_1 = require("../../../helpers/pagination.helper");
const coupon_constants_1 = require("./coupon.constants");
const coupon_utils_1 = require("./coupon.utils");
//create coupon
const createCoupon = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const couponCode = yield (0, coupon_utils_1.generateCouponCode)(10);
    props.couponCode = couponCode;
    const coupon = yield coupon_models_1.Coupon.create(props);
    if (!coupon) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'Coupon not created');
    }
    return coupon;
});
//get all coupon
const getAllCoupons = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: coupon_constants_1.couponSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.entries(filtersData).length) {
        andCondition.push({
            $and: (_a = Object.entries(filtersData)) === null || _a === void 0 ? void 0 : _a.map(([field, value]) => ({
                [field]: [value],
            })),
        });
    }
    //sorting and pagination
    const { page, limit, skip, sortBy, sortOrder } = pagination_helper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    //find collection
    const result = yield coupon_models_1.Coupon.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    if (!result) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! coupon is not found.');
    }
    const total = yield coupon_models_1.Coupon.countDocuments();
    return {
        meta: { page: page, limit: limit, total: total },
        data: result,
    };
});
//get coupon by id
const getCouponById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield coupon_models_1.Coupon.findById(id);
    if (!coupon) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'oops! coupon is not found.');
    }
    return coupon;
});
//update coupon
const updateCoupon = (id, props) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield coupon_models_1.Coupon.findByIdAndUpdate(id, props, { new: true });
    if (!coupon) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'Coupon not updated');
    }
    return coupon;
});
//delete coupon
const deleteCoupon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield coupon_models_1.Coupon.findByIdAndDelete(id);
    if (!coupon) {
        throw new api_error_1.default(http_status_1.default.BAD_REQUEST, 'Coupon not deleted');
    }
    return coupon;
});
exports.couponService = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
};
