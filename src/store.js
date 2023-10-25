const { configureStore } = require("@reduxjs/toolkit");

import menuSlice from "./slice/menuSlice";

export const store = configureStore({
    reducer: {
        menu: menuSlice
    }
})