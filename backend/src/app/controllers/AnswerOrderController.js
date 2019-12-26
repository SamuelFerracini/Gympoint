import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import OrderAnswered from '../jobs/OrderAnswered';
import Student from '../models/Student';
import * as Yup from 'yup';

class AnswerOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const helpOrder = await HelpOrder.findOne({
      where: { id },
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order does not exists.' });
    }

    const student = await Student.findOne({
      where: { id: helpOrder.student_id },
    });

    const { answer } = req.body;

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();
    await helpOrder.save();

    await Queue.add(OrderAnswered.key, {
      helpOrder,
      student,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerOrderController();
