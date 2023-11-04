const { MENU_ITEMS } = require("@/constants");
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    activeActionItems: null,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuItemClicked: (state, action) => {
            state.activeMenuItem = action.payload;
        },
        actionItemClicked: (state, action) => {
            state.activeActionItems = action.payload;
        },
    }
});

export const {menuItemClicked, actionItemClicked} = menuSlice.actions;
export default menuSlice.reducer;