import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../Comment/CommentSection";

export interface Option {
    _id:string;
    pollId:string;
    text: string;
    count: number;

}

export interface Poll {
  _id: string;
  comments:Comment[]
  question: string;
  hasVoted: boolean;
  options: Option[];
  userId: {
    name: string;
    profilePhotoURL: string;
  };
}


interface PollState {
  poll: Poll[];
}

const initialState: PollState = {
  poll: [],
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setPoll(state, action: PayloadAction<Poll[]>) {
      state.poll = action.payload;
    },
    addVote(state, action: PayloadAction<{ pollId: string; optionId: string }>) {
      const { pollId, optionId } = action.payload;
      const poll = state.poll.find((poll) => poll._id === pollId);
      if (poll) {
        const option = poll.options.find((option) => option._id === optionId);
        if (option) {
          option.count++;
        }
      }
    },
    addToPoll(state, action: PayloadAction<Poll>) {
      console.log(action.payload);
      state.poll.unshift(action.payload);
    },
  },
});


export default pollSlice;
