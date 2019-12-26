import { endOfWeek, startOfWeek, subDays } from 'date-fns';

import Checkin from '../schemas/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const checkins = await Checkin.find({
      student_id: id,
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const startWeek = startOfWeek(new Date());
    const endWeek = endOfWeek(new Date());
    const endWeekSub = subDays(endWeek, 1);

    const checkins = await Checkin.find({
      student_id: id,
      createdAt: { $gte: startWeek, $lt: endWeekSub },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You cant store more than 5 checkins a week.' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
