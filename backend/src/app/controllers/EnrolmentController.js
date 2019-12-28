import * as Yup from 'yup';
import { addMonths, parseISO, isBefore, isAfter } from 'date-fns';

import Enrolment from '../models/Enrolment';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';

import EnrolmentInformation from '../jobs/EnrolmentInformation';

class EnrolmentController {
  async index(req, res) {
    const enrolments = await Enrolment.findAll({
      attributes: [
        'id',
        ['price', 'totalPrice'],
        'start_date',
        'end_date',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration', ['price', 'monthPrice']],
        },
      ],
    });
    return res.json(enrolments);
  }

  async show(req, res) {
    const { id } = req.params;
    const enrolment = await Enrolment.findOne({
      where: { id },
      attributes: [
        'id',
        ['price', 'totalPrice'],
        'start_date',
        'end_date',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration', ['price', 'monthPrice']],
        },
      ],
    });
    if (!enrolment) {
      return res.status(400).json({ error: 'Enrolment does not exists.' });
    }

    return res.json(enrolment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .positive()
        .required(),
      plan_id: Yup.number()
        .integer()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const studenEnrolled = await Enrolment.findOne({
      where: { student_id },
    });

    if (studenEnrolled) {
      return res.status(400).json({ error: 'Student have alredy enroled.' });
    }

    const planChoosed = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planChoosed) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited' });
    }

    const { price, duration } = planChoosed;

    const totalPrice = price * duration;
    const endDate = addMonths(parseISO(start_date), duration);

    const enrolment = await Enrolment.create({
      student_id,
      plan_id,
      start_date,
      price: totalPrice,
      end_date: endDate,
    });

    await Queue.add(EnrolmentInformation.key, {
      enrolment,
      student,
      planChoosed,
    });

    return res.json(enrolment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .integer()
        .positive(),
      enrolment_id: Yup.number()
        .integer()
        .positive(),
      start_date: Yup.date(),
    });

    const enrolment_id = req.params.id;

    const enrolment = await Enrolment.findByPk(enrolment_id);
    if (!enrolment) {
      return res.status(401).json({ error: 'Enrolment not found.' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(401).json({ error: 'Plan not found.' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permited.' });
    }

    const { price, duration } = plan;

    const totalPrice = price * duration;

    await enrolment.update({
      ...req.body,
      price: totalPrice,
    });

    const enrolmentUpdated = await Enrolment.findOne({
      where: { id: enrolment_id },
      attributes: [
        'id',
        ['price', 'totalPrice'],
        'start_date',
        'end_date',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration', ['price', 'monthPrice']],
        },
      ],
    });

    console.log(enrolmentUpdated.toJSON());

    return res.json(enrolmentUpdated);
  }

  async destroy(req, res) {
    const enrolment = await Enrolment.findByPk(req.params.id);

    if (!enrolment) {
      return res.status(401).json({
        error: 'Enrolment does not exists.',
      });
    }

    const { start_date } = enrolment;

    if (isAfter(new Date(), start_date)) {
      return res.status(400).json({ error: 'Enrolment is active.' });
    }

    await Enrolment.destroy({
      where: {
        id: req.params.id,
      },
    });

    const enrolments = await Enrolment.findAll({
      attributes: [
        'id',
        ['price', 'totalPrice'],
        'start_date',
        'end_date',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'students',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration', ['price', 'monthPrice']],
        },
      ],
    });

    return res.json(enrolments);
  }
}

export default new EnrolmentController();
