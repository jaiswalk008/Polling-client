import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Option {
    _id:string;
    pollId:string;
    text: string;
    count: number;

}

export interface Poll {
  _id: string;
  question: string;
  hasVoted: boolean;
  options: Option[];
  userId: {
    name: string;
    profilePhotoURL: string;
  };
}


interface PollState {
  polls: Poll[];
}

const initialState: PollState = {
  polls: [],
};

const pollSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    setPolls(state, action: PayloadAction<Poll[]>) {
      state.polls = action.payload;
    },
    addVote(state, action: PayloadAction<{ pollId: string; optionId: string }>) {
      const { pollId, optionId } = action.payload;
      const poll = state.polls.find((poll) => poll._id === pollId);
      if (poll) {
        const option = poll.options.find((option) => option._id === optionId);
        if (option) {
          option.count++;
        }
      }
    },
    addToPolls(state, action: PayloadAction<Poll>) {
      state.polls.push(action.payload);
    },
  },
});


export default pollSlice;
