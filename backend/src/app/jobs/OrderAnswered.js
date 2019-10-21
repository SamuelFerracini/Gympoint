import Mail from '../../lib/Mail';

class OrderAnswered {
  get key() {
    return 'OrderAnswered';
  }

  async handle({ data }) {
    const { student, helpOrder } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pergunta respondida',
      template: 'orderAnswered',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: helpOrder.answer_at,
      },
    });
  }
}

export default new OrderAnswered();
