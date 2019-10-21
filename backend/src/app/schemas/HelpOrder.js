import mongose from 'mongoose';

const HelperOrderSchema = new mongose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: false,
      default: null,
    },
    answer_at: {
      type: Number,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongose.model('HelpOrder', HelperOrderSchema);
