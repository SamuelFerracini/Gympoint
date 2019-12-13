import HelpOrder from '../models/HelpOrder';
import Queue from '../../lib/Queue';
import OrderAnswered from '../jobs/OrderAnswered';
import Student from '../models/Student';

class AnswerOrderController {
  async store(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findOne({
      id,
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
