"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (error) {
        const zodError = error;
        return res.status(400).json({
            message: zodError.errors[0].message,
        });
    }
};
exports.default = validate;
