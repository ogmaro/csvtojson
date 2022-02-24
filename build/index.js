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
const express_1 = __importDefault(require("express"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const csvFilePath = './data/details.csv';
const PORT = 3000;
const app = (0, express_1.default)();
app.get('/convert', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Async / await usage
    const jsonArray = yield (0, csvtojson_1.default)().fromFile(csvFilePath);
    //write a loop to check is any of the data is empty
    let data = jsonArray.map((value) => {
        if (!value.phone) {
            value.phone = 'missing data';
        }
        return value;
    });
    res.send(data);
}));
app.listen(PORT, () => {
    console.log(`Serve running on ${PORT}`);
});
