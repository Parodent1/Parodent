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
exports.getAppointments = void 0;
const firebase_1 = __importDefault(require("../firebase/firebase"));
const dayjs_1 = __importDefault(require("dayjs"));
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        const targetDate = date || (0, dayjs_1.default)().format('YYYY-MM-DD');
        const snapshot = yield firebase_1.default.collection('appointments')
            .where('date', '==', targetDate).get();
        const appointmentsByCabinet = {};
        snapshot.forEach(doc => {
            var _a;
            const data = doc.data();
            const cabinet = ((_a = data.cabinet) === null || _a === void 0 ? void 0 : _a.toString()) || 'unknown';
            if (!appointmentsByCabinet[cabinet]) {
                appointmentsByCabinet[cabinet] = [];
            }
            appointmentsByCabinet[cabinet].push(Object.assign({ id: doc.id }, data));
        });
        Object.keys(appointmentsByCabinet).forEach(cabinet => {
            appointmentsByCabinet[cabinet].sort((a, b) => {
                return (0, dayjs_1.default)(b.time, 'HH:mm').unix() - (0, dayjs_1.default)(a.time, 'HH:mm').unix();
            });
        });
        res.status(200).send(appointmentsByCabinet);
    }
    catch (error) {
        res.status(500).send('Failed to fetch appointments');
    }
});
exports.getAppointments = getAppointments;
