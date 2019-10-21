// // import * as Yup from 'yup';
// import { endOfWeek, startOfWeek, subDays } from 'date-fns';
import Student from '../models/Student';
import HelpOrder from '../schemas/HelpOrder';

class HelpOrderController {
  async show(req, res) {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const questions = await HelpOrder.find({
      student_id: id,
    });
    return res.json(questions);
  }

  async index(req, res) {
    const questions = await HelpOrder.find({
      answer: null,
    });
    return res.json(questions);
  }

  async store(req, res) {
    const { id } = req.params;
    const student = await Student.findOne({
      where: { id },
    });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
