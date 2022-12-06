"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const ProtectedRoute = () => {
    if (!localStorage.getItem('token')) {
        return <react_router_dom_1.Navigate to='/login'/>;
    }
    return <react_router_dom_1.Outlet />;
};
exports.default = ProtectedRoute;
