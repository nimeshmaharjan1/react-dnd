import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface ListItem {
  id: number;
  text: string;
}
interface State {
  list: ListItem[];
}

const initialState: State = {
  list: [],
};
const listSlice = createSlice({
  name: "list store",
  initialState,
  reducers: {
    addItem: (state: State, action: PayloadAction<ListItem>) => {
      state.list = state.list.concat(action.payload);
      console.log(state.list);
    },
  },
});

export const { addItem } = listSlice.actions;
export const selectList = (state: RootState) => state.listStore.list;
export default listSlice.reducer;
