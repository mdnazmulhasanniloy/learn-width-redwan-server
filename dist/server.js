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
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./config/index"));
const app_1 = __importDefault(require("./app"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const colors = require('colors');
process.on('uncaughtException', error => {
    console.error(`uncaughtException rejection detected: ${error.toString()}`.red);
    process.exit(1);
});
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(index_1.default === null || index_1.default === void 0 ? void 0 : index_1.default.mongo_uri);
            console.log(`database connection successful`.green);
            server = app_1.default.listen(index_1.default === null || index_1.default === void 0 ? void 0 : index_1.default.port, () => {
                console.log(`server started on port ${index_1.default === null || index_1.default === void 0 ? void 0 : index_1.default.port}`.yellow);
            });
        }
        catch (error) {
            console.error(`failed to connect database`.red, error);
        }
        //unhandled Rejection detected
        process.on('unhandledRejection', error => {
            console.log(`Unhandled rejection detected: ${error}`);
            if (server) {
                server.close(() => {
                    process.exit(1);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
main();
process.on('SIGTERM', () => {
    console.error(`SIGTERM is received`);
    if (server) {
        server.close();
    }
});
