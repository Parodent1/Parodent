"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const cors_1 = __importDefault(require("cors"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/api', patientRoutes_1.default);
app.use('/api', doctorRoutes_1.default);
app.use('/api', appointmentRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
