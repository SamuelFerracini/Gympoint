import mongose from 'mongoose';

const CheckinSchema = new mongose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongose.model('Checkin', CheckinSchema);
