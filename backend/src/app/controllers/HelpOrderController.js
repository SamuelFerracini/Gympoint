import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const questions = await HelpOrder.findAll({
      order: [['createdAt', 'DESC']],
      where: { answer: null },
      attributes: ['id', 'student_id', 'question', 'answer'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(questions);
  }

  async store(req, res) {
    const schemas = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schemas.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const { question } = req.body;

    if (question.length > 255) {
      return res
        .status(400)
        .json({ error: 'Maximum number of characters exceeded.' });
    }

    const helpOrder = await HelpOrder.create({
      student_id: student.id,
      question,
    });

    return res.json(helpOrder);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }
    const helpOrder = await HelpOrder.findAll({
      where: { student_id: student.id },
      // where: { student_id: student.id, answer: null },
      order: [['createdAt', 'DESC']],
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
